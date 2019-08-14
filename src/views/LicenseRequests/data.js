export function getLicenseTypes() {
  return [
    { abbr: "EPL", name: "Exclusive Prospecting License" },
    { abbr: "EPL", name: "Exclusive Reconnaissance License" },
    { abbr: "NEPL", name: "Non-Exclusive Prospecting License" },
    { abbr: "RL", name: "Reconnaissance License" },
    { abbr: "ML", name: "Mining License" },
    { abbr: "MDRL", name: "Mining Deposit Retention License" },
    { abbr: "MC", name: "Mining Claims" }
  ];
}
export function getCompanies() {}
export function matchData(state, value) {
  return (
    state.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
    state.abbr.toLowerCase().indexOf(value.toLowerCase()) !== -1
  );
}
