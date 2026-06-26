/* ──────────────────────────────────────────────────────────────
   City landing-page content (freight-company-<city> pages)
   One factory builds the shared copy; per-city facts are passed in.
   Used by src/pages/CityFreightPage.tsx
   ────────────────────────────────────────────────────────────── */

export interface CityService { title: string; desc: string }
export interface CitySection { heading: string; body: string[] }
export interface CityFAQ { q: string; a: string }
export interface CityStat { label: string; value: string }

export interface City {
  slug: string            // freight-company-melbourne
  name: string            // Melbourne
  state: string           // Victoria
  port: string            // Port of Melbourne
  airport: string         // Melbourne Airport
  metaTitle: string
  metaDescription: string
  /** sub-line under the hero headline */
  heroSubline: string
  stats: CityStat[]
  /** opening port paragraph (unique per city) + the shared bridge line */
  introPort: string
  introBivry: string
  servicesIntro: string
  services: CityService[]
  sections: CitySection[]
  faqs: CityFAQ[]
  /** closing line before the quote CTA */
  closing: string
}

interface CityInput {
  name: string
  state: string
  port: string
  airport: string
  distributor: string     // e.g. Dandenong
  interstate: string      // e.g. "Sydney, Brisbane, Adelaide, and Perth"
  metaTitle: string
  metaDescription: string
  stats: CityStat[]
  introPort: string       // full opening paragraph, ends with the shared bridge line
  networkLane: string     // unique 3rd paragraph of the forwarders section
}

function makeCity(c: CityInput): City {
  const { name, state, port, airport, distributor, interstate } = c
  return {
    slug: `freight-company-${name.toLowerCase()}`,
    name,
    state,
    port,
    airport,
    metaTitle: c.metaTitle,
    metaDescription: c.metaDescription,
    heroSubline: `A freight company in ${name} that moves road, sea & air cargo end to end.`,
    // First two cells are port credibility facts (passed per city); last two are Bivry value-props.
    stats: [
      ...c.stats,
      { label: 'Freight Modes', value: 'Road · Sea · Air' },
      { label: 'Customs Clearance', value: 'In-House' },
    ],
    introPort: c.introPort,
    introBivry:
      `Bivry handles road freight, sea cargo, and air freight in and out of ${name} for businesses that need ` +
      `their stock to arrive on time and their paperwork to clear without a fight. Whether you're importing a ` +
      `single LCL consignment from Shenzhen or running weekly pallets to a distributor in ${distributor}, you get ` +
      `one team that owns the shipment from pickup to delivery.`,
    servicesIntro:
      `Freight is simple until it isn't. A booking falls through, a container gets held at the wharf, a customs ` +
      `entry needs a permit nobody mentioned. Our job at Bivry is to handle those moments before they reach you. ` +
      `Here's what we take off your plate.`,
    services: [
      {
        title: `Road freight across ${state} and interstate`,
        desc:
          `Pallets, crates, IBCs, anything a forklift can move. We run B2B palletised freight from ${name} to ` +
          `${interstate}, with full-load and part-load options so you only pay for the space you use.`,
      },
      {
        title: 'Sea freight, FCL and LCL',
        desc:
          `Full container loads for high-volume stock, less-than-container loads when you don't need a whole box. ` +
          `Sea freight costs a fraction of air on a per-kilo basis, which makes it the default for anything that ` +
          `isn't urgent.`,
      },
      {
        title: 'Air freight for time-sensitive cargo',
        desc:
          `When a delay costs you more than the freight bill, we book air. Useful for samples, spare parts, ` +
          `perishables, and anything where a week at sea isn't an option.`,
      },
      {
        title: 'Customs clearance and compliance',
        desc:
          `Our licensed brokers lodge your entries through the Integrated Cargo System and deal with the ` +
          `Australian Border Force directly. Tariff classification, duty calculation, permits, and the documents ` +
          `that go with them.`,
      },
      {
        title: 'Warehousing and distribution',
        desc:
          `Storage near the port, pick and pack, and last-mile delivery into ${name} metro. Your stock lands, ` +
          `gets stored, and ships out to customers without changing hands five times.`,
      },
    ],
    sections: [
      {
        heading: `Freight transport in ${name}, run as one job`,
        body: [
          `Freight transport in ${name} falls apart at the handoffs. A truck drops a container, a wharf holds it, ` +
            `a second carrier picks it up late, and your delivery date slips by a week. We run the legs as a single ` +
            `movement instead of a chain of separate bookings.`,
          `That means one team books the pickup, moves the cargo across road, sea, or air, clears it through ` +
            `customs, and delivers it to your dock. You track every leg in one place and you call one number when ` +
            `something needs to change.`,
        ],
      },
      {
        heading: `Why we're the best freight company in ${name} for small business`,
        body: [
          `Large global forwarders move a lot of freight. They also move you down the priority list the moment ` +
            `something goes wrong. Bivry is built the other way around, which is what makes us a strong fit for ` +
            `small business.`,
          `You get a named contact who knows your account, not a ticket number and a queue. When your shipment ` +
            `hits a snag, you call a person who can already see the file. We're small enough to give you that and ` +
            `connected enough to move freight anywhere our partner network reaches, which is most of the world.`,
          `For a small business, that difference is the whole game. You don't have a logistics department. You ` +
            `have a person who also does three other jobs and needs the freight handled, not explained. We handle it.`,
        ],
      },
      {
        heading: `Freight management in ${name} that scales with you`,
        body: [
          `Freight management in ${name} is the planning layer that sits above the trucks and containers: choosing ` +
            `the mode, booking the space, tracking the boxes, and catching the problems early. Done well, it's ` +
            `invisible. Done badly, it's the reason your stock arrives late and over budget.`,
          `We manage the whole chain from one desk. You see where every shipment sits through real-time tracking, ` +
            `you get one invoice instead of five, and you have one number to call when plans change. As your volumes ` +
            `grow, the same system carries more freight without you rebuilding anything.`,
        ],
      },
      {
        heading: `Freight broker in ${name}: one point of accountability`,
        body: [
          `As your freight broker in ${name}, Bivry sits between you and the carriers, booking the right truck, ` +
            `ship, or plane for each shipment and negotiating the rate so you don't have to. A broker who clears ` +
            `customs in-house closes the gap where most shipments stall, because the same team that books the cargo ` +
            `also answers for it at the border.`,
          `You brief us once. We handle the bookings, the documents, and the carrier relationships, and you get a ` +
            `single point of contact who owns the outcome.`,
        ],
      },
      {
        heading: `International freight forwarders in ${name}`,
        body: [
          `International freight forwarders in ${name} organise the movement of goods across borders without owning ` +
            `the ships or planes that carry them. We pick the carriers, book the space, prepare the documents, and ` +
            `steer your cargo through customs at both ends.`,
          `That matters most when several modes stack up in one shipment: a truck from the supplier's factory, a ` +
            `vessel across the ocean, customs clearance on arrival, then another truck to your warehouse. Each ` +
            `handoff is a chance for something to slip. We coordinate all of it so the shipment moves as one job, ` +
            `not five disconnected bookings.`,
          c.networkLane,
        ],
      },
      {
        heading: `Global freight shipping from ${name}, handled in-house`,
        body: [
          `Global freight shipping from ${name} breaks down at the seams between providers. The forwarder blames ` +
            `the broker, the broker blames the carrier, and you're the one chasing a container nobody will claim. ` +
            `Bivry closes those seams by running the whole shipment in-house.`,
          `You get FCL and LCL sea freight, express air cargo through ${airport}, customs clearance under one ` +
            `roof, and delivery to your door. One team, one file, one point of accountability from the factory ` +
            `floor to your loading dock.`,
        ],
      },
    ],
    faqs: [
      {
        q: `How do I choose the best freight company in ${name}?`,
        a:
          `Start with the modes you actually use. A company strong in sea freight isn't automatically good at ` +
          `express air, so match their strengths to your shipments. Then check three things: whether they hold ` +
          `their own customs licence or outsource it, whether you get a named contact or a call centre, and how ` +
          `they handle a shipment that goes wrong. Ask for references from businesses your size. A forwarder built ` +
          `for enterprise accounts will treat a small importer as an afterthought, and you'll feel it the first ` +
          `time something's urgent.`,
      },
      {
        q: 'What is the difference between a freight forwarder and a carrier?',
        a:
          `A carrier owns the trucks, ships, or planes and physically moves the goods. A freight forwarder ` +
          `arranges the movement but doesn't own the equipment. The forwarder books the carriers, prepares the ` +
          `documentation, manages customs, and coordinates each leg of the journey. Think of the carrier as the ` +
          `driver and the forwarder as the person who plans the whole trip, handles the paperwork, and answers ` +
          `for it if a connection is missed. Many shipments use several carriers across one route, and the ` +
          `forwarder is what holds them together.`,
      },
      {
        q: `Does a freight company in ${name} handle customs clearance?`,
        a:
          `Some do, some don't. The ones with in-house licensed customs brokers lodge your entries directly ` +
          `through the Integrated Cargo System and deal with the Australian Border Force without handing you off ` +
          `to a third party. That's faster and leaves fewer gaps where a shipment can stall. Bivry clears customs ` +
          `in-house, including tariff classification, duty and GST calculation, and any permits your goods need. ` +
          `If a company outsources clearance, ask who's accountable when an entry is held, because the answer is ` +
          `usually "not us."`,
      },
    ],
    closing:
      `Tell us what you're moving and where it needs to go. Send Bivry the details and we'll come back with a ` +
      `clear price and a plan, not a runaround.`,
  }
}

export const CITIES: City[] = [
  makeCity({
    name: 'Melbourne',
    state: 'Victoria',
    port: 'Port of Melbourne',
    airport: 'Melbourne Airport',
    distributor: 'Dandenong',
    interstate: 'Sydney, Brisbane, Adelaide, and Perth',
    metaTitle: 'Freight Company Melbourne | Road, Sea & Air Freight',
    metaDescription:
      'Melbourne freight company moving road, sea & air cargo with in-house customs clearance. One team, one point of contact, from port to your door. Get a quote.',
    stats: [
      { label: 'Gateway', value: 'Port of Melbourne' },
      { label: 'Annual Throughput', value: '~3.5M TEU / yr' },
    ],
    introPort:
      `Melbourne moves more containers than any port in the country. In 2025 the Port of Melbourne handled about ` +
      `3.5 million TEU, roughly a third of every container that enters or leaves Australia. That scale is good ` +
      `news when your goods are moving and a headache when they're stuck. The right freight company in Melbourne ` +
      `is what keeps you on the first side of that line.`,
    networkLane:
      `Our network covers the trade lanes Melbourne businesses use most, with China leading by a wide margin: ` +
      `half of the port's container imports now come from there. We also move steady volumes across Southeast ` +
      `Asia, the US, Europe, and New Zealand.`,
  }),
  makeCity({
    name: 'Sydney',
    state: 'New South Wales',
    port: 'Port Botany',
    airport: 'Sydney Airport',
    distributor: 'Eastern Creek',
    interstate: 'Brisbane, Adelaide, and Perth',
    metaTitle: 'Freight Company Sydney | Road, Sea & Air Freight',
    metaDescription:
      'Sydney freight company handling road, sea & air cargo with in-house customs clearance. One team from Port Botany to your door. Request a quote today.',
    stats: [
      { label: 'Gateway', value: 'Port Botany' },
      { label: 'Annual Throughput', value: '~2.8M TEU / yr' },
    ],
    introPort:
      `Port Botany moves more containers than any other terminal in New South Wales. It handles about 2.8 million ` +
      `TEU a year, roughly 99.6% of the state's container trade, and it's the only port in Australia with on-dock ` +
      `rail at every container terminal. That scale is good news when your goods are moving and a headache when ` +
      `they're stuck. The right freight company in Sydney is what keeps you on the first side of that line.`,
    networkLane:
      `Our network covers the trade lanes Sydney businesses use most, with China leading by a wide margin, ` +
      `alongside steady volumes from across Southeast Asia. We also move steady volumes across the US, Europe, ` +
      `and New Zealand.`,
  }),
  makeCity({
    name: 'Brisbane',
    state: 'Queensland',
    port: 'Port of Brisbane',
    airport: 'Brisbane Airport',
    distributor: 'Acacia Ridge',
    interstate: 'Sydney, Adelaide, and Perth',
    metaTitle: 'Freight Company Brisbane | Road, Sea & Air Freight',
    metaDescription:
      'Brisbane freight company moving road, sea & air cargo with in-house customs clearance. One contact from the Port of Brisbane to your door. Get a quote.',
    stats: [
      { label: 'Gateway', value: 'Port of Brisbane' },
      { label: 'Annual Throughput', value: '1.62M TEU FY25' },
    ],
    introPort:
      `The Port of Brisbane is Queensland's largest container port and the third busiest in the country. It ` +
      `handled a record 1.62 million TEU in FY25, about 95% of the state's container trade, connected by ` +
      `dual-gauge freight rail to the inland terminal at Acacia Ridge. That scale is good news when your goods ` +
      `are moving and a headache when they're stuck. The right freight company in Brisbane is what keeps you on ` +
      `the first side of that line.`,
    networkLane:
      `Our network covers the trade lanes Brisbane businesses use most, with China and the wider Asia-Pacific ` +
      `leading, alongside strong agricultural exports out of Queensland. We also move steady volumes across the ` +
      `US, Europe, and New Zealand.`,
  }),
  makeCity({
    name: 'Perth',
    state: 'Western Australia',
    port: 'Fremantle',
    airport: 'Perth Airport',
    distributor: 'Kewdale',
    interstate: 'Sydney, Brisbane, and Adelaide',
    metaTitle: 'Freight Company Perth | Road, Sea & Air Freight',
    metaDescription:
      'Perth freight company handling road, sea & air cargo with in-house customs clearance. One team from Fremantle to your door. Request a freight quote.',
    stats: [
      { label: 'Gateway', value: 'Fremantle' },
      { label: 'Annual Throughput', value: '~850K TEU / yr' },
    ],
    introPort:
      `Fremantle is Western Australia's main container port and the gateway between Perth and Asia across the ` +
      `Indian Ocean. Its Inner Harbour handles around 850,000 TEU a year, almost all of the state's container ` +
      `trade, with the highest rail mode share of any port in the country via the Kewdale intermodal terminal. ` +
      `That scale is good news when your goods are moving and a headache when they're stuck. The right freight ` +
      `company in Perth is what keeps you on the first side of that line.`,
    networkLane:
      `Our network covers the trade lanes Perth businesses use most, with Asia and the Indian Ocean rim leading, ` +
      `particularly Singapore and Southeast Asian hubs. We also move steady volumes across the US, Europe, and ` +
      `New Zealand.`,
  }),
  makeCity({
    name: 'Adelaide',
    state: 'South Australia',
    port: 'Port Adelaide',
    airport: 'Adelaide Airport',
    distributor: 'Gillman',
    interstate: 'Sydney, Brisbane, and Perth',
    metaTitle: 'Freight Company Adelaide | Road, Sea & Air Freight',
    metaDescription:
      'Adelaide freight company moving road, sea & air cargo with in-house customs clearance. One point of contact from Port Adelaide to your door. Get a quote.',
    stats: [
      { label: 'Gateway', value: 'Port Adelaide' },
      { label: 'Annual Throughput', value: '~500K TEU / yr' },
    ],
    introPort:
      `Port Adelaide is South Australia's main container and bulk gateway, handling close to half a million TEU ` +
      `a year. It's the trade outlet for the state's grain, wine and produce, with road and rail links into the ` +
      `Adelaide industrial corridor. That scale is good news when your goods are moving and a headache when ` +
      `they're stuck. The right freight company in Adelaide is what keeps you on the first side of that line.`,
    networkLane:
      `Our network covers the trade lanes Adelaide businesses use most, with Asia leading, alongside South ` +
      `Australia's grain, wine and produce exports. We also move steady volumes across the US, Europe, and ` +
      `New Zealand.`,
  }),
]
