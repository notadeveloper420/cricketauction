export default function HomeScreen({ goTo }) {
  return (
    <div>
      <div style={{ marginBottom: "2.5rem" }}>
        <h1
          style={{
            fontSize: 48,
            fontWeight: 700,
            lineHeight: 1,
            marginBottom: 8,
          }}
        >
          Build your
          <br />
          <span style={{ color: "var(--green)" }}>dream XI.</span>
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 16 }}>
          Real-time multiplayer auction simulator — IPL, The Hundred
        </p>
      </div>

      <div className="grid2" style={{ maxWidth: 380, marginBottom: "2rem" }}>
        <button
          className="btn btn-primary"
          style={{
            padding: "14px 20px",
            fontSize: 16,
            fontFamily: "Barlow Condensed",
            letterSpacing: "0.05em",
          }}
          onClick={() => goTo("host-setup")}
        >
          HOST AUCTION
        </button>
        <button
          className="btn"
          style={{
            padding: "14px 20px",
            fontSize: 16,
            fontFamily: "Barlow Condensed",
            letterSpacing: "0.05em",
          }}
          onClick={() => goTo("join")}
        >
          JOIN ROOM
        </button>
      </div>

      <div
        style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}
      >
        <div className="grid3" style={{ maxWidth: 500 }}>
          {[
            { label: "Leagues", value: "3" },
            { label: "Real players", value: "200+" },
            { label: "Max teams", value: "10" },
          ].map((s) => (
            <div key={s.label}>
              <div
                style={{
                  fontFamily: "Barlow Condensed",
                  fontSize: 28,
                  fontWeight: 700,
                  color: "var(--green)",
                }}
              >
                {s.value}
              </div>
              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
        <p
          style={{
            marginTop: "1.5rem",
            fontSize: 13,
            color: "var(--text-dim)",
          }}
        >
          Overseas caps · Squad minimums · Real salary caps · AI bots fill empty
          slots
        </p>
      </div>
    </div>
  );
}
