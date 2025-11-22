/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo, useState } from "react";
import type { Inputs } from "@/lib/calc";
import { estimate } from "@/lib/calc";

const initial: Inputs = {
  totalAreaM2: 200,
  t3Count: 2,
  t2Count: 3,
  commercialAreaM2: 40,
  avgT3M2: 60,
  avgT2M2: 45,
  ceilingHeightM: 2.5
};

export default function Page() {
  const [values, setValues] = useState<Inputs>(initial);
  const result = useMemo(() => estimate(values), [values]);

  function set<K extends keyof Inputs>(key: K, val: number) {
    setValues((v) => ({ ...v, [key]: Number.isFinite(val) ? val : 0 }));
  }

  const totalUnits = values.t3Count + values.t2Count;

  return (
    <main
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "32px 16px 64px"
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 24
        }}
      >
        <img
          alt="logo"
          src="https://img.icons8.com/?size=100&id=59787&format=png&color=0F172A"
          width={32}
          height={32}
          style={{ display: "block" }}
        />
        <h1 style={{ margin: 0, fontSize: 24 }}>
          Planificateur de transformation ? 2?T3, 3?T2 + local
        </h1>
      </header>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          alignItems: "start",
          marginBottom: 24
        }}
      >
        <div
          style={{
            background: "white",
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            padding: 16
          }}
        >
          <h2 style={{ marginTop: 0, fontSize: 18 }}>Param?tres</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12
            }}
          >
            <NumberField
              label="Surface totale (m?)"
              value={values.totalAreaM2}
              onChange={(n) => set("totalAreaM2", n)}
            />
            <NumberField
              label="Surface local commercial (m?)"
              value={values.commercialAreaM2}
              onChange={(n) => set("commercialAreaM2", n)}
            />
            <NumberField
              label="Nombre de T3"
              value={values.t3Count}
              onChange={(n) => set("t3Count", n)}
            />
            <NumberField
              label="Nombre de T2"
              value={values.t2Count}
              onChange={(n) => set("t2Count", n)}
            />
            <NumberField
              label="Surface moyenne T3 (m?)"
              value={values.avgT3M2}
              onChange={(n) => set("avgT3M2", n)}
            />
            <NumberField
              label="Surface moyenne T2 (m?)"
              value={values.avgT2M2}
              onChange={(n) => set("avgT2M2", n)}
            />
            <NumberField
              label="Hauteur sous plafond (m)"
              value={values.ceilingHeightM}
              onChange={(n) => set("ceilingHeightM", n)}
            />
          </div>
          <div
            style={{
              marginTop: 12,
              fontSize: 13,
              color: "#475569"
            }}
          >
            <div>Logements totaux: <strong>{totalUnits}</strong></div>
            <div>
              Surface r?sidentielle disponible estim?e:{" "}
              <strong>{result.computed.residentialAreaM2} m?</strong>
            </div>
          </div>
          {result.warnings.length > 0 && (
            <ul
              style={{
                marginTop: 12,
                padding: "8px 12px",
                background: "#fff7ed",
                border: "1px solid #fed7aa",
                borderRadius: 8,
                color: "#9a3412",
                fontSize: 13
              }}
            >
              {result.warnings.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          )}
        </div>

        <div
          style={{
            background: "white",
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            padding: 16
          }}
        >
          <h2 style={{ marginTop: 0, fontSize: 18 }}>Corps d'?tat ? engager</h2>
          <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.6 }}>
            {result.professionals.map((p, idx) => (
              <li key={idx}>
                <strong>{p.name}</strong>{" "}
                <span style={{ color: "#64748b" }}>
                  ({p.when === "early" ? "amont" : p.when === "mid" ? "chantier" : "fin"})
                </span>
                {p.mandatory ? (
                  <span
                    style={{
                      marginLeft: 6,
                      fontSize: 11,
                      color: "#166534",
                      background: "#dcfce7",
                      border: "1px solid #bbf7d0",
                      padding: "1px 6px",
                      borderRadius: 999
                    }}
                  >
                    requis
                  </span>
                ) : (
                  <span
                    style={{
                      marginLeft: 6,
                      fontSize: 11,
                      color: "#92400e",
                      background: "#fffbeb",
                      border: "1px solid #fde68a",
                      padding: "1px 6px",
                      borderRadius: 999
                    }}
                  >
                    recommand?
                  </span>
                )}
                <div style={{ fontSize: 13, color: "#475569" }}>
                  {p.scope.join(" ? ")}
                </div>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 12, fontSize: 12, color: "#64748b" }}>
            Indications g?n?rales ? ? confirmer par m?tr?s d?taill?s et plans.
          </div>
        </div>
      </section>

      <section
        style={{
          background: "white",
          border: "1px solid #e2e8f0",
          borderRadius: 12,
          padding: 16
        }}
      >
        <h2 style={{ marginTop: 0, fontSize: 18 }}>Mat?riaux et quantit?s estim?es</h2>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 14
            }}
          >
            <thead>
              <tr>
                <Th>Cat?gorie</Th>
                <Th>D?signation</Th>
                <Th>Unit?</Th>
                <Th>Quantit?</Th>
                <Th>Notes</Th>
              </tr>
            </thead>
            <tbody>
              {result.materials.map((m, i) => (
                <tr key={i} style={{ borderTop: "1px solid #e2e8f0" }}>
                  <Td>{m.category}</Td>
                  <Td>{m.name}</Td>
                  <Td>{m.unit}</Td>
                  <Td>{Intl.NumberFormat("fr-FR").format(m.quantity)}</Td>
                  <Td>{m.notes ?? ""}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
            marginTop: 16,
            fontSize: 13,
            color: "#475569"
          }}
        >
          <Kpi label="cloisons (ml)" value={result.computed.partitionsLm} />
          <Kpi label="pi?ces d'eau" value={result.computed.wetRoomsCount} />
          <Kpi label="cuisines" value={result.computed.kitchensCount} />
        </div>
      </section>
      <footer style={{ marginTop: 24, fontSize: 12, color: "#64748b" }}>
        Estimation indicative bas?e sur ratios; valider par un professionnel.
      </footer>
    </main>
  );
}

function NumberField({
  label,
  value,
  onChange
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <label style={{ display: "grid", gap: 6, fontSize: 13 }}>
      <span>{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{
          border: "1px solid #cbd5e1",
          borderRadius: 8,
          padding: "8px 10px",
          fontSize: 14
        }}
      />
    </label>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th
      style={{
        textAlign: "left",
        padding: "10px 8px",
        fontWeight: 600,
        background: "#f1f5f9",
        borderBottom: "1px solid #e2e8f0"
      }}
    >
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return <td style={{ padding: "10px 8px" }}>{children}</td>;
}

function Kpi({ label, value }: { label: string; value: number | string }) {
  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: 10,
        padding: 12,
        background: "#f8fafc"
      }}
    >
      <div style={{ fontSize: 12, color: "#64748b" }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 700 }}>
        {typeof value === "number"
          ? Intl.NumberFormat("fr-FR").format(value)
          : value}
      </div>
    </div>
  );
}

