export interface ScheduleDay {
  day: string;
  periods: string[];
}

export const schedule: ScheduleDay[] = [
  {
    day: "Senin",
    periods: ["BI", "BI", "BI", "PP", "PP", "KK RPL", "KK RPL", "KK RPL", "KK RPL", "KK RPL"],
  },
  {
    day: "Selasa",
    periods: ["Matematika", "Matematika", "Matematika", "Sejarah", "Sejarah", "KK RPL", "KK RPL", "KK RPL", "KK RPL", "KK RPL"],
  },
  {
    day: "Rabu",
    periods: ["Bahasa Inggris", "Bahasa Inggris", "KK RPL", "KK RPL", "KK RPL", "KK RPL", "MP", "MP", "MP", "MP"],
  },
  {
    day: "Kamis",
    periods: ["Bimbingan Konseling", "KK RPL", "KK RPL", "KK RPL", "KK RPL", "PKK", "PKK", "PKK", "PKK", "PKK"],
  },
  {
    day: "Jumat",
    periods: ["Bahasa Inggris", "Bahasa Inggris", "PJOK", "PJOK", "PAI", "PAI", "PAI", "Bahasa Jawa", "Bahasa Jawa"],
  },
];

export const subjectAbbreviations: Record<string, string> = {
  BI: "Bahasa Indonesia",
  PP: "Pendidikan Pancasila",
  "KK RPL": "Konsentrasi Keahlian RPL",
  MP: "Manajemen Perkantoran",
  PKK: "Produk Kreatif & Kewirausahaan",
  PAI: "Pendidikan Agama Islam",
  PJOK: "Pendidikan Jasmani & Kesehatan",
  PAI_short: "PAI",
};
