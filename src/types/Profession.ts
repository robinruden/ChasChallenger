enum Profession {
    Arbetslös = "Arbetslös",
    Brevbärare = "Brevbärare",
    Advokat = "Advokat",
    Civilingenjör = "Civilingenjör",
    Arkitekt  = "Arkitekt",
    Fysiker = "Fysiker",
    Golvläggare = "Golvläggare",
    Elektriker = "Elektriker",
    Betongarbetare = "Betongarbetare",
    Murare = "Murare",
    Lokförare = "Lokförare",
    Kock = "Kock",
    Lärare = "Lärare",
    Polis = "Polis",
    Massör = "Massör",
    Psykolog = "Psykolog",
    Trafiklärare = "Trafiklärare",
    Sjuksköterska = "Sjuksköterska",
    Tandläkare = "Tandläkare",
    Präst = "Präst",
    Tågvärd = "Tågvärd",
    Veterinär = "Veterinär",
    Tolk = "Tolk",
    Soldat = "Soldat",
    Smed = "Smed",
    Snickare = "Snickare",
    Tulltjänsteman = "Tulltjänsteman",
    Kriminalvårdare = "Kriminalvårdare",
    Ljudtekniker = "Ljudtekniker",
    Mäklare = "Mäklare",
    Hästskötare = "Hästskötare",
    Ekonom = "Ekonom",
    Glasmästare = "Glasmästare",
    Bagare = "Bagare",
    Drifttekniker = "Drifttekniker",
    Lagerarbetare = "Lagerarbetare",
    Lastbilsförare = "Lastbilsförare",
    Jägmästare = "Jägmästare",
    Pilot = "Pilot",
    Matros = "Matros",
    Spelutvecklare = "Spelutvecklare",
    Takmontör = "Takmontör",
    Säljare = "Säljare",
    Spårsvetsare = "Spårsvetsare",
  }

export const ProfessionsArray = (): Profession[] => {
    return Object.values(Profession);
}

export default Profession;