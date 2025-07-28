export const toast = ({ title, description, variant = 'default' }: any) => {
  // fallback: alert
  alert(`${title}\n${description}`)
}