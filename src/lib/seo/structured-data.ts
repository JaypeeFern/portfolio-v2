import type { PortfolioData } from "@/types/portfolio";

type JsonLdObject = Record<string, unknown>;

function optionalText(value: string | undefined): string | undefined {
  const trimmedValue = value?.trim();
  return trimmedValue || undefined;
}

function normalizeExternalUrl(value: string | undefined): string | undefined {
  const trimmedValue = optionalText(value);
  if (!trimmedValue) {
    return undefined;
  }

  try {
    const url = new URL(trimmedValue);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return undefined;
    }

    return url.toString();
  } catch {
    return undefined;
  }
}

function schemaDate(value: string | undefined): string | undefined {
  const trimmedValue = optionalText(value);
  if (!trimmedValue) {
    return undefined;
  }

  const match = /^([0-9]{4})(?:-([0-9]{2})(?:-([0-9]{2}))?)?$/.exec(
    trimmedValue,
  );
  if (!match || Number(match[1]) === 0) {
    return undefined;
  }

  const month = match[2] ? Number(match[2]) : undefined;
  const day = match[3] ? Number(match[3]) : undefined;

  if (month !== undefined && (month < 1 || month > 12)) {
    return undefined;
  }

  if (day !== undefined) {
    const year = Number(match[1]);
    const date = new Date(Date.UTC(year, (month ?? 1) - 1, day));

    if (
      date.getUTCFullYear() !== year ||
      date.getUTCMonth() !== (month ?? 1) - 1 ||
      date.getUTCDate() !== day
    ) {
      return undefined;
    }
  }

  return trimmedValue;
}

function createProjectNodes(
  portfolio: PortfolioData,
  personId: string,
  siteUrl: string,
): JsonLdObject[] {
  return portfolio.projects.flatMap((project, index) => {
    const name = optionalText(project.projectName);
    const description = optionalText(project.projectDescription);

    if (!name || !description) {
      return [];
    }

    const projectNode: JsonLdObject = {
      "@type": "CreativeWork",
      "@id": siteUrl + "/#project-" + (index + 1),
      name,
      description,
      creator: { "@id": personId },
    };

    const tools = project.tools
      .map((tool) => optionalText(tool))
      .filter((tool): tool is string => Boolean(tool));

    if (tools.length > 0) {
      projectNode.keywords = tools;
    }

    const liveUrl = normalizeExternalUrl(project.links?.live);
    if (liveUrl) {
      projectNode.url = liveUrl;
    }

    const repositoryUrl = normalizeExternalUrl(project.links?.github);
    if (repositoryUrl) {
      projectNode.sameAs = repositoryUrl;
    }

    const dateCreated = schemaDate(project.dateOfDevelopment.from);
    if (dateCreated) {
      projectNode.dateCreated = dateCreated;
    }

    return [projectNode];
  });
}

function createExperienceNodes(
  portfolio: PortfolioData,
  personId: string,
  siteUrl: string,
): JsonLdObject[] {
  return portfolio.experiences.flatMap((experience, index) => {
    const position = optionalText(experience.position);
    const companyName = optionalText(experience.companyName);

    if (!position || !companyName) {
      return [];
    }

    const employeeRole: JsonLdObject = {
      "@type": "EmployeeRole",
      roleName: position,
      member: { "@id": personId },
    };

    const description = optionalText(experience.description);
    if (description) {
      employeeRole.description = description;
    }

    const startDate = schemaDate(experience.dateOfEmployment.from);
    if (startDate) {
      employeeRole.startDate = startDate;
    }

    const endDateValue = experience.dateOfEmployment.to;
    if (endDateValue.trim().toLowerCase() !== "present") {
      const endDate = schemaDate(endDateValue);
      if (endDate) {
        employeeRole.endDate = endDate;
      }
    }

    return [
      {
        "@type": "Organization",
        "@id": siteUrl + "/#experience-" + (index + 1),
        name: companyName,
        member: employeeRole,
      },
    ];
  });
}

export function createStructuredData(
  portfolio: PortfolioData,
  siteUrl: string,
): JsonLdObject {
  const personId = siteUrl + "/#person";
  const websiteId = siteUrl + "/#website";
  const about = portfolio.about;

  const person: JsonLdObject = {
    "@type": "Person",
    "@id": personId,
    name: about.name,
    url: siteUrl,
    jobTitle: about.role,
  };

  const location = optionalText(about.location);
  if (location) {
    person.homeLocation = {
      "@type": "Place",
      name: location,
    };
  }

  const socialLinks = [
    normalizeExternalUrl(about.socialLinks.linkedin),
    normalizeExternalUrl(about.socialLinks.github),
  ].filter((link): link is string => Boolean(link));

  if (socialLinks.length > 0) {
    person.sameAs = socialLinks;
  }

  const website: JsonLdObject = {
    "@type": "WebSite",
    "@id": websiteId,
    url: siteUrl,
    name: about.name,
    author: { "@id": personId },
    publisher: { "@id": personId },
  };

  const websiteDescription = optionalText(about.personalDescription);
  if (websiteDescription) {
    website.description = websiteDescription;
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      website,
      ...createProjectNodes(portfolio, personId, siteUrl),
      ...createExperienceNodes(portfolio, personId, siteUrl),
    ],
  };
}

export function serializeJsonLd(value: JsonLdObject): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
