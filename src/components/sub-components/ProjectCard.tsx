import portfolioData from '../../../portfolio.json';

type Project = typeof portfolioData.projects[number];

interface ProjectCardProps {
    project: Project
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const { projectName, projectDescription, tools, dateOfDevelopment } = project;

    return (
        <div className="w-full flex flex-col justify-center items-center gap-4 text-justify">
            <h2>{projectName}</h2>
            <p>{projectDescription}</p>
            <div className="flex gap-4">
                {tools.map((tool, index) => (
                    <span key={index}>{tool}</span>
                ))}
            </div>
            <p>
                {dateOfDevelopment?.from} - {dateOfDevelopment?.to}
            </p>
        </div>
    );
};

export default ProjectCard;