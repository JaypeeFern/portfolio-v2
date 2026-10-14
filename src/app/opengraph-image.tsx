import { ImageResponse } from "next/og";
import { portfolioData } from "@/lib/portfolio";

export const alt = portfolioData.about.name + " — " + portfolioData.about.role;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  const { name, role, location } = portfolioData.about;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#f7f5ef",
          color: "#102622",
          padding: "64px 72px",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -105,
            top: -185,
            width: 510,
            height: 510,
            borderRadius: 255,
            backgroundColor: "#0b5d43",
            opacity: 0.08,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 82,
            bottom: -215,
            width: 365,
            height: 365,
            border: "2px solid #0b5d43",
            borderRadius: 183,
            opacity: 0.18,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 1000,
              gap: 18,
            }}
          >
            <div
              style={{
                fontSize: 78,
                fontWeight: 700,
                lineHeight: 1.03,
                letterSpacing: -3,
              }}
            >
              {name}
            </div>
            <div
              style={{
                width: 78,
                height: 4,
                backgroundColor: "#0b674b",
                marginTop: 4,
                marginBottom: 2,
              }}
            />
            <div
              style={{
                color: "#36564d",
                fontSize: 34,
                fontWeight: 500,
              }}
            >
              {role}
            </div>
          </div>
          {location ? (
            <div
              style={{
                position: "absolute",
                left: 72,
                bottom: 64,
                color: "#536b64",
                fontSize: 19,
                letterSpacing: 1,
              }}
            >
              {location}
            </div>
          ) : null}
        </div>
      </div>
    ),
    size,
  );
}
