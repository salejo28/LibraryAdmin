export const formatDate = (d?: string | number | Date, format?: "YYYY-MM-DD" | "YYYY/MM/DD") => {
  const dateFormat = format ?? "YYYY-MM-DD";
  const date = d ? new Date(d) : new Date()
  const year = date.getFullYear()
  let month = `${date.getMonth() + 1}`
  let day = `${date.getDate()}`
  if (month.length < 2) month = `0${month}`
  if (day.length < 2) day = `0${day}`

  return [year, month, day].join(dateFormat === "YYYY-MM-DD" ? "-" : "/")
}