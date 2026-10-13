import Image from "next/image";
import type { CSSProperties } from "react";
import { event } from "@/lib/event";
import { assetPath } from "@/lib/assets";
import { Action } from "@/components/action";
import { Tickets } from "@/components/tickets";
import { Arrow } from "@/components/arrow";
import { CroppedArtwork } from "@/components/cropped-artwork";
import { PartnerLogos } from "@/components/partner-logos";
function HeroSupplement() {
  if (!event.artwork.heroText) return null;
  const crops = event.heroSupplement;
  return (
    <div className="hero-supplement" role="img" aria-label={crops.alt}>
      <div className="hero-supplement-desktop" aria-hidden="true">
        <CroppedArtwork
          src={event.artwork.heroText}
          alt=""
          crop={crops.desktop}
          sizes="1080px"
        />
      </div>
      <div className="hero-supplement-mobile" aria-hidden="true">
        <div className="hero-supplement-pair">
          <CroppedArtwork
            src={event.artwork.heroText}
            alt=""
            crop={crops.dinner}
            sizes="1080px"
          />
          <CroppedArtwork
            src={event.artwork.heroText}
            alt=""
            crop={crops.party}
            sizes="1080px"
          />
        </div>
        <CroppedArtwork
          src={event.artwork.heroText}
          alt=""
          crop={crops.drinks}
          sizes="1080px"
          className="hero-supplement-drinks"
        />
        <div className="hero-supplement-conditions">
          <CroppedArtwork
            src={event.artwork.heroText}
            alt=""
            crop={crops.dresscode}
            sizes="1080px"
          />
          <CroppedArtwork
            src={event.artwork.heroText}
            alt=""
            crop={crops.prize}
            sizes="1080px"
          />
        </div>
      </div>
    </div>
  );
}
export default function Home() {
  return (
    <main>
      <a className="skip-link" href="#experiences">
        Vai alle esperienze
      </a>
      <div className="partners-top" aria-label="Partner dell’evento">
        <PartnerLogos priority />
      </div>
      <header className="site-header">
        <a href="#" className="wordmark" aria-label="FOBIA, inizio pagina">
          F / P
        </a>
        <div className="header-date">
          <CroppedArtwork
            src={event.artwork.headerDate}
            alt={event.date}
            crop={event.artworkCrops.headerDate}
            sizes="(max-width: 699px) 250px, 320px"
            priority
          />
        </div>
        <a href="#tickets">
          ENTER FOBIA <Arrow />
        </a>
      </header>
      <section
        className={`hero ${event.artwork.hero ? "has-artwork" : ""}`}
        aria-labelledby="hero-title"
      >
        <div className="hero-meta">
          <span>HALLOWEEN / PIETRASOLE</span>
          <span>EDIZIONE 2026</span>
        </div>
        {event.artwork.hero ? (
          <div className="hero-artwork">
            <CroppedArtwork
              src={event.artwork.hero}
              crop={event.artworkCrops.hero}
              alt="FOBIA PIETRASOLE, titolo ufficiale con gli occhi spaventati"
              multiply
              priority
            />
            <p>{event.payoff}</p>
            <HeroSupplement />
          </div>
        ) : (
          <div className="hero-title">
            <span className="hero-kicker">{event.date} · ONE NIGHT ONLY</span>
            <h1 id="hero-title">
              FOBIA<span>PIETRASOLE</span>
            </h1>
            <div className="poster-rule">
              <span aria-hidden="true">✦</span>
            </div>
            <p>{event.payoff}</p>
            <HeroSupplement />
          </div>
        )}
        {event.artwork.hero && (
          <h1 id="hero-title" className="sr-only">
            FOBIA PIETRASOLE — Una notte dentro le tue paure.
          </h1>
        )}
        <div className="hero-bottom">
          <p>
            {event.date}
            <br />
            <span>{event.location}</span>
          </p>
          <div className="hero-actions">
            <a className="action dark" href="#experiences">
              {event.copy.heroDiscover} <span>↓</span>
            </a>
            <a
              className="text-link"
              href={event.xceedUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              ACQUISTA TICKET <Arrow />
            </a>
          </div>
        </div>
        <div className="hero-foot">
          <span>{event.dinner.start} DINNER / {event.party.entryFrom} PARTY ENTRY</span>
          <span>SCROLL TO FEEL ↓</span>
        </div>
      </section>
      <section className="section intro">
        <h2>{event.copy.introTitle}</h2>
        <p className="intro-format">{event.copy.introFormat}</p>
        <p className="intro-description">{event.copy.introDescription}</p>
        <CroppedArtwork
          src={event.artwork.location}
          crop={event.artworkCrops.location}
          alt="Visual ufficiale della Masseria Pietrasole"
          className="intro-location"
        />
      </section>
      <section id="experiences" className="section experiences">
        <div className="section-top">
          <span className="eyebrow">01 / {event.copy.experiencesHeading}</span>
          <span aria-hidden="true">✦</span>
        </div>
        <a className="experience-row" href="#dinner">
          <span className="eyebrow">
            {event.dinner.start} / {event.copy.dinnerFormat}
          </span>
          <h2>{event.copy.dinnerPreviewTitle}</h2>
          <span className="experience-summary">
            <span className="experience-music">{event.copy.dinnerPreviewMusic}</span>
            <span>6 portate. 6 Paure. {event.dinner.price}€ p.p. Vini Esclusi.</span>
          </span>
          <span className="experience-arrow">
            <Arrow />
          </span>
        </a>
        <a className="experience-row" href="#party">
          <span className="eyebrow">ENTRY FROM {event.party.entryFrom} / {event.copy.partyFormat}</span>
          <h2>
            HALLOWEEN
            <br />
            PARTY
          </h2>
          <span className="experience-summary">{event.copy.partySummary}</span>
          <span className="experience-arrow">
            <Arrow />
          </span>
        </a>
        <p className="fine-print">{event.copy.dinnerIncludesParty}</p>
      </section>
      <section
        id="dinner"
        className={`section dinner ${event.artwork.dinner ? "has-dinner-artwork" : ""}`}
        style={
          {
            "--dinner-desktop-position":
              event.dinner.artworkStyle.desktopPosition,
            "--dinner-mobile-position":
              event.dinner.artworkStyle.mobilePosition,
            "--dinner-artwork-opacity": event.dinner.artworkStyle.opacity,
          } as CSSProperties
        }
      >
        <div className="dinner-stage">
          {event.artwork.dinner && (
            <div className="dinner-backdrop" aria-hidden="true">
              <Image
                src={assetPath(event.artwork.dinner)}
                alt=""
                fill
                sizes="(max-width: 700px) 100vw, 75vw"
              />
            </div>
          )}
          <div className="section-top">
            <span className="eyebrow">02 / {event.copy.dinnerLabel}</span>
            <span className="eyebrow">DALLE {event.dinner.start}</span>
          </div>
          <div className="dinner-show-heading">
            <h2>{event.copy.dinnerHeading}</h2>
            <p className="eyebrow">DALLE {event.dinner.start}</p>
          </div>
          <div className="dinner-show-music">
            <h3 className="eyebrow">{event.copy.dinnerMusicLabel}</h3>
            {event.dinner.musicians.map((artist, index) => (
              <div className={`dinner-artist ${index === 0 ? "featured" : ""}`} key={artist.name}>
                <p className="dinner-artist-name">{artist.name}</p>
                {artist.format && <p className="dinner-artist-format">{artist.format}</p>}
              </div>
            ))}
          </div>
          <div className="dinner-show-menu">
            <h3 className="eyebrow">{event.copy.dinnerMenuLabel}</h3>
            <p className="dinner-show-courses">{event.copy.dinnerCourses}</p>
            <p className="dinner-copy">{event.copy.dinnerJourney}</p>
            <p className="dinner-closing">{event.copy.dinnerClosing}</p>
            <p className="dinner-show-price">€{event.dinner.price} P.P. · {event.dinner.note.toUpperCase()}</p>
            <Action href={event.dinnerUrl} className="dark">{event.copy.dinnerCta}</Action>
            <p className="fine-print">{event.copy.dinnerIncludesParty}</p>
          </div>
        </div>
        <div className="dinner-menu">
          <div className="menu-top">
            <span className="eyebrow">IL MENU / SEI ATTI</span>
            <span aria-hidden="true">✦</span>
          </div>
          <div className="menu">
            {event.dinner.menu.map((item, i) => (
              <div className="menu-item" key={item.fear}>
                <span className="menu-number">0{i + 1}</span>
                <div>
                  <h3>{item.fear}</h3>
                  <p>{item.dish}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        id="party"
        className={`section party ${event.artwork.party ? "has-party-artwork" : ""}`}
        style={
          {
            "--party-desktop-position":
              event.party.artworkStyle.desktopPosition,
            "--party-mobile-position": event.party.artworkStyle.mobilePosition,
            "--party-artwork-opacity": event.party.artworkStyle.opacity,
          } as CSSProperties
        }
      >
        {event.artwork.party && (
          <div className="party-backdrop" aria-hidden="true">
            <Image
              src={assetPath(event.artwork.party)}
              alt=""
              fill
              sizes="(max-width: 700px) 100vw, 70vw"
            />
          </div>
        )}
        <div className="section-top">
          <span className="eyebrow">03 / {event.copy.partyFormat}</span>
          <span className="eyebrow">ENTRY FROM {event.party.entryFrom}</span>
        </div>
        <h2 className="display">
          HALLOWEEN
          <br />
          <span className="outline">PARTY.</span>
        </h2>
        <div className="party-grid">
          <div>
            <p>{event.copy.partySummary.toUpperCase()}</p>
            <div className="party-lineup">
              <p className="eyebrow">{event.copy.partyLineupLabel}</p>
              <p className="party-lineup-announcement">{event.copy.partyLineupAnnouncement}</p>
            </div>
            <Action href={event.xceedUrl}>ACQUISTA IL TUO TICKET</Action>
          </div>
        </div>
      </section>
      <Tickets />
      <section id="tables" className="section tables">
        <div className="section-top">
          <span className="eyebrow">05 / HALLOWEEN PARTY · BOTTLE SERVICE</span>
          <span aria-hidden="true">✦</span>
        </div>
        <h2 className="display">
          TABLE
          <br />
          EXPERIENCE.
        </h2>
        <div className="table-list">
          {event.tables.map((table, i) => (
            <article className="table-package" key={table.id}>
              <span className="eyebrow">
                0{i + 1} / {table.availability || "PRIVÉE"}
              </span>
              <h3>{table.name}</h3>
              {table.description && <p>{table.description}</p>}
              <div className="table-spend">
                <strong>€{table.minimum}</strong>
                <span>
                  MINIMUM
                  <br />
                  SPEND
                </span>
              </div>
              <p>{table.entries}</p>
              {table.extra && <p>{table.extra}</p>}
              <p className="deposit">ACCONTO €{table.deposit}</p>
              <Action href={table.url} className="dark">
                {table.cta}
              </Action>
            </article>
          ))}
        </div>
      </section>
      <section id="location" className="section location">
        <div className="section-top">
          <span className="eyebrow">06 / UN SOLO LUOGO</span>
          <span>{event.date}</span>
        </div>
        <h2 className="display">
          MASSERIA
          <br />
          PIETRASOLE.
        </h2>
        <div className="location-bottom">
          <p>{event.copy.address}</p>
          <Action
            href={event.mapsUrl}
            pending="Le indicazioni per raggiungere la location saranno disponibili a breve."
          >
            {event.copy.directionsLabel}
          </Action>
        </div>
      </section>
      <section className="section finale">
        <span className="eyebrow">{event.date} / PIETRASOLE</span>
        <h2>
          QUAL È<br />
          LA TUA
          <br />
          <span>FOBIA?</span>
        </h2>
        <a className="action dark" href="#tickets">
          ENTER FOBIA <Arrow />
        </a>
        <p>{event.payoff}</p>
      </section>
      <section className="production-credits" aria-labelledby="producers-title">
        <h2 id="producers-title">{event.copy.producersLabel}</h2>
        <PartnerLogos />
      </section>
      <footer>
        <span>
          {event.name} © {new Date(event.dateISO).getFullYear()}
        </span>
        {event.partners.length === 0 && (
          <p className="partner-credit">
            UN EVENTO DI
            <br />
            <span>CAMBÈ · NŌH · HAGAKURE · YUPPIES</span>
          </p>
        )}
        <a href="#">TORNA SU ↑</a>
      </footer>
    </main>
  );
}
