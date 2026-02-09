import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Be Creative Events - Qatar's Premier Creative Events Agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#101820",
          position: "relative",
        }}
      >
        {/* Background gradient circles */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "10%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(224,37,28,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "10%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(130,50,167,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Logo text */}
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: "-2px",
            marginBottom: 20,
          }}
        >
          <span style={{ color: "#FFFFFF" }}>b.</span>
          <span style={{ color: "#E0251C" }}>creative</span>
          <span style={{ color: "#FFFFFF" }}> events</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "#D7D1CA",
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginBottom: 40,
          }}
        >
          Be Memorable
        </div>

        {/* Divider */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 30,
          }}
        >
          <div style={{ width: 60, height: 4, backgroundColor: "#E0251C", borderRadius: 2 }} />
          <div style={{ width: 60, height: 4, backgroundColor: "#8232A7", borderRadius: 2 }} />
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 20,
            color: "#999999",
            textAlign: "center",
            maxWidth: 600,
          }}
        >
          Celebrating Brands for the Love of Qatar
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 6,
            display: "flex",
          }}
        >
          <div style={{ flex: 1, backgroundColor: "#E0251C" }} />
          <div style={{ flex: 1, backgroundColor: "#8232A7" }} />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
