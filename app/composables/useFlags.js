import { computed } from "vue";

export function useCountryFlag() {
  // ✅ Map country names to their flag file names
  const flagMap = {
    // Continents / Regions
    World: "wr.png",
    Europe: "eu.png",
    Asia: "afc.png",
    "South America": "sta.png",
    "North America": "nta.jpeg",
    Africa: "za.png", // fallback if needed
    Australia: "au.png",

    // Countries
    Ethiopia: "et.png",
    England: "en.png",
    India: "in.png",
    Estonia: "ee.png",
    Albania: "al.png",
    Uganda: "ug.png",
    Luxembourg: "lu.png",
    Georgia: "ge.png",
    Niger: "ne.png",
    Venezuela: "ve.png",
    Liberia: "lr.png",
    China: "cn.png",
    Spain: "es.png",
    Mauritania: "mr.png",
    Iran: "ir.png",
    Gibraltar: "gi.png",
    Italy: "it.png",
    "Bosnia and Herzegovina": "ba.png",
    Azerbaijan: "az.png",
    Malawi: "mw.png",
    Malaysia: "my.png",
    Zambia: "zm.png",
    Germany: "de.png",
    Kyrgyzstan: "kg.png",
    Uzbekistan: "uz.png",
    France: "fr.png",
    Andorra: "ad.png",
    "Ivory Coast": "ci.png",
    "Burkina Faso": "bf.png",
    Jordan: "jo.png",
    "Congo DR": "cd.png",
    Portugal: "pt.png",
    Netherlands: "nl.png",
    Belgium: "be.png",
    Tajikistan: "tj.png",
    "South Africa": "za.png",
    Argentina: "ar.png",
    Latvia: "lv.png",
    Lithuania: "lt.png",
    Nicaragua: "ni.png",
    Lebanon: "lb.png",
    Philippines: "ph.png",
    Guatemala: "gu.png",
    Kazakhstan: "kz.png",
    "Puerto Rico": "pr.png",
    Iceland: "is.png",
    Austria: "at.png",
    Bahrain: "bh.png",
    Paraguay: "pa.png",
    Belarus: "by.png",
    Bolivia: "bo.png",
    Brazil: "br.png",
    Bulgaria: "bg.png",
    Canada: "ca.png",
    Chile: "cl.png",
    Colombia: "co.png",
    Croatia: "hr.png",
    Cyprus: "cy.png",
    "Czech Republic": "cz.png",
    Denmark: "dk.png",
    Ecuador: "ec.png",
    Egypt: "eg.png",
    "El Salvador": "sv.png",
    Finland: "fi.png",
    Greece: "gr.png",
    Honduras: "hn.png",
    Hungary: "hu.png",
    Indonesia: "id.png",
    Israel: "il.png",
    Japan: "jp.png",
    Kenya: "ke.png",
    Kuwait: "kw.png",
    Mexico: "mx.png",
    Morocco: "ma.png",
    "Northern Ireland": "nir.png",
    "North Macedonia": "mk.png",
    Norway: "no.png",
    Peru: "pe.png",
    Poland: "pl.png",
    Qatar: "qa.png",
    Romania: "ro.png",
    Russia: "ru.png",
    "Saudi Arabia": "sa.png",
    Scotland: "stl.png", // or "sc.png" if you have one
    Serbia: "rs.png",
    Slovakia: "sk.png",
    Slovenia: "si.png",
    "South Korea": "skr.png",
    Sweden: "se.png",
    Switzerland: "ch.png",
    Thailand: "th.png",
    Tunisia: "tn.png",
    Turkey: "tr.png",
    Ukraine: "ua.png",
    Uruguay: "uy.png",
    USA: "us.png",
    Vietnam: "vn.png",
    Wales: "wls.png",
  };

  // 🧠 function to get flag by name
  const getFlag = (countryName) => {
    const normalized = countryName.trim();
    const flag = flagMap[normalized];
    if (!flag) {
      console.warn(`⚠️ Missing flag for: ${countryName}`);
      return "wr.png";
    }
    return flag;
  };

  return { getFlag, flagMap };
}
