export interface Article {
  id: string;
  section: string;
  kicker?: string;
  headline: string;
  subhead?: string;
  summary: string;
  byline: string;
  readTime: string;
  date: string;
  page?: string;
  imageUrl?: string;
  imageCaption?: string;
  imageCredit?: string;
  authorImage?: string;
  isOpinion?: boolean;
  type: 'news' | 'opinion' | 'analysis' | 'cooking' | 'wirecutter' | 'audio';
  content: string[];
  pullQuote?: string;
  keyTakeaways?: string[];
  audioMinutes?: number;
}

export const ARTICLES: Article[] = [
  {
    id: 'trump-attorney-ties',
    section: 'U.S. Politics',
    kicker: 'Special Investigation',
    page: 'Page A1',
    headline: 'Trump Has Firm Business Ties With Attorney at Center of Suit',
    subhead: 'Newly disclosed financial documents reveal expansive joint ventures and consulting retainers across multiple real estate holdings, intensifying scrutiny over conflict-of-interest allegations in state court.',
    summary: 'Newly disclosed financial documents reveal expansive joint ventures and consulting retainers across multiple real estate holdings, intensifying scrutiny over conflict-of-interest allegations in state court.',
    byline: 'Maggie Haberman and Ben Protess',
    readTime: '7 MIN READ',
    date: 'Wednesday, Oct. 16, 2024',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxUDqKC4oFS8CltYQTFFhS5VqZvXy0ssakEDgTHm7UPCi3JqG-ozNmSkOGXXSCFnkqbLOGEpphHS6wFrtS-3Iny3XgiojdYynMxP2_luxihywyiRvBYx6lqKwcocxxPyfcalA1-A5HVy1RzTiX6JckD36pkfu382I3KEjOj9yA7BRkJmLetdrzHxF1oyuAvuVfohcdBR4hzy8MaldwalsdTo1oGWQIQo92NHOSAsIEK6JF8c2JpIBm',
    imageCaption: 'Alina Habba arriving at Manhattan Supreme Court on Tuesday morning.',
    imageCredit: 'POOL PHOTO BY JUSTIN LANE',
    type: 'news',
    audioMinutes: 7,
    keyTakeaways: [
      'Disclosed financial filings detail multiple commercial lease pacts and retainers linking the legal counsel to corporate entities.',
      'Ethics experts and bar monitors flag potential dual-representation tensions ahead of appellate scheduling.',
      'The defense team maintains all outside business dealings were vetted thoroughly through independent compliance auditors.'
    ],
    pullQuote: 'The documents reveal an entanglement that goes far beyond standard legal representation, weaving personal commercial ventures into ongoing courtroom defense.',
    content: [
      'NEW YORK — Newly disclosed corporate filings and financial disclosures submitted in Manhattan state court show that Donald J. Trump and his chief courtroom advocate, Alina Habba, maintain extensive shared business investments spanning several private holding corporations.',
      'The filings, reviewed by The New York Times following an unsealing order issued late Monday, describe advisory arrangements and equity agreements involving commercial real estate holdings in New Jersey and South Florida. The disclosures come as legal ethics scholars and opposing counsel question whether the overlapping financial arrangements could prejudice courtroom strategy in ongoing civil actions.',
      'Legal scholars who reviewed the documents noted that such close business partnerships between a defendant and principal defense counsel are exceedingly rare in high-stakes civil litigation, where distinct boundaries between client interests and personal financial gain are paramount.',
      '“When an attorney has substantial financial commitments bound up in the exact entities that are subject to court judgments, separating objective counsel from shared balance sheets becomes virtually impossible,” said Deborah Rhode, a professor of legal ethics at Columbia Law School.',
      'A spokesperson for the legal team issued a statement vigorously rejecting any conflict: “Ms. Habba’s representation has at all times been conducted in complete accordance with judicial ethics and New York professional codes of conduct. Any suggestion to the contrary is a politically motivated distraction.”',
      'The revelations are expected to color upcoming oral arguments as appellate judges consider evidentiary motions that could determine whether certain company records remain sealed from public view.',
      'Over the past two years, court filings and state corporate registry documents show at least four limited liability partnerships established under Delaware and Florida statutes that cross-list the two principals as managing partners.',
      'Judges in parallel civil proceedings have scheduled a preliminary status conference for early next month to evaluate whether special disclosures or independent conflict waivers must be executed on the record.'
    ]
  },
  {
    id: 'women-leaving-trump',
    section: 'U.S. Politics',
    page: 'Page A3',
    headline: 'High-Ranking Women Are Leaving the Trump Administration',
    subhead: 'An exodus of cabinet-level and senior executive advisers marks a significant turn in internal staffing strategies ahead of the upcoming election cycle.',
    summary: 'An exodus of cabinet-level and senior executive advisers marks a significant turn in internal staffing strategies ahead of the upcoming election cycle.',
    byline: 'Annie Karni',
    readTime: '3 MIN READ',
    date: 'Wednesday, Oct. 16, 2024',
    type: 'news',
    audioMinutes: 4,
    keyTakeaways: [
      'Four senior directors have announced departures in the past twenty days.',
      'Departing aides cite divergent campaign messaging priorities and intensive scheduling strains.',
      'Transition advisers are reviewing replacement candidates with deeper congressional liaison backgrounds.'
    ],
    pullQuote: 'The departures represent more than normal turnover; they reflect a philosophical realigning of the inner campaign apparatus.',
    content: [
      'WASHINGTON — A succession of high-ranking female advisers and department heads have stepped down from senior advisory roles over the past month, signaling a notable shift in leadership personnel as the campaign moves into its decisive phase.',
      'Interviews with six current and former aides indicate that disagreements over strategic media placement, campaign messaging direction, and rapid structural reorganization precipitated several of the departures.',
      'The turnover has left key advisory portfolios—including family leave policy, suburban voter outreach, and judicial advisory coalitions—under interim management. Campaign officials, however, described the transitions as routine realignment as operations transition to field enforcement.',
      'Personnel records reflect that three of the departing aides had served consecutively across two presidential terms and primary campaigns, bringing institutional memory that colleagues say will be difficult to replace on short notice.'
    ]
  },
  {
    id: 'kentucky-fall',
    section: 'U.S.',
    page: 'Page A8',
    headline: 'The Deep Roots and Sudden Fall of Kentucky',
    subhead: 'Decades of infrastructure underinvestment collided with shifting local economics, creating an acute crisis across several historic towns.',
    summary: 'Decades of infrastructure underinvestment collided with shifting local economics, creating an acute crisis across several historic towns.',
    byline: 'Campbell Robertson',
    readTime: '4 MIN READ',
    date: 'Wednesday, Oct. 16, 2024',
    type: 'news',
    audioMinutes: 5,
    pullQuote: 'When the rail freight stopped running daily, it was not merely an economic metric that dipped—it severed the central artery that kept these valleys connected.',
    content: [
      'HAZARD, Ky. — Along the winding creek beds and steep hollows of eastern Kentucky, the cumulative weight of industrial transition has reached an inflection point that local leaders describe as unprecedented in its breadth.',
      'Water treatment facilities built during the post-war mining boom have begun failing in rapid sequence, leaving thousands of residents across Perry and Harlan counties under rolling boil-water advisories for months at a time.',
      'State legislators have convened emergency oversight hearings in Frankfort, debating whether to allocate federal infrastructure balances directly toward municipal stabilization funds or mandate consolidated regional utilities.',
      '“We poured asphalt when we should have repaired water mains, and now the bedrock itself is cracking underneath our school buildings,” said Mayor Darrell Collins of Whitesburg.'
    ]
  },
  {
    id: 'inflation-data',
    section: 'Business',
    kicker: 'Live Analysis',
    page: 'Page B1',
    headline: 'Inflation Data Offers Fresh Complications for Global Central Banks',
    subhead: 'Consumer prices held stubbornly persistent across key sectors, defying forecasts and rattling bond traders worldwide.',
    summary: 'Consumer prices held stubbornly persistent across key sectors, defying forecasts and rattling bond traders worldwide.',
    byline: 'Jeanna Smialek',
    readTime: '5 MIN READ',
    date: 'Wednesday, Oct. 16, 2024',
    type: 'analysis',
    audioMinutes: 5,
    pullQuote: 'The final mile of price stabilization is proving far more jagged than the descent from post-pandemic peaks suggested.',
    content: [
      'WASHINGTON — Fresh consumer price indices released this morning revealed stubborn price stickiness across shelter, service contracts, and domestic freight, dampening expectations for imminent rate relief across the Federal Reserve, the European Central Bank, and the Bank of England.',
      'The core index rose 0.3 percent on a monthly basis, matching the previous reading and outpacing consensus forecasts. Treasury yields spiked sharply within minutes of the 8:30 a.m. publication.',
      '“Central bankers are caught between cooling employment metrics and sticky services inflation that refuses to subside,” said Diane Swonk, chief economist at KPMG. “The room for policy maneuver has narrowed considerably.”',
      'Markets reacted with swift recalibration, slashing probability estimates for consecutive half-point interest rate reductions at the upcoming November monetary policy conference.'
    ]
  },
  {
    id: 'legal-strategy-appeals',
    section: 'U.S.',
    page: 'Page A12',
    headline: 'What the Legal Strategy Signals for Upcoming Civil Appeals',
    subhead: 'Defense attorneys signaled a broad challenge questioning evidentiary standards and executive timeline jurisdiction.',
    summary: 'Defense attorneys signaled a broad challenge questioning evidentiary standards and executive timeline jurisdiction.',
    byline: 'Alan Feuer',
    readTime: '4 MIN READ',
    date: 'Wednesday, Oct. 16, 2024',
    type: 'news',
    content: [
      'NEW YORK — In the wake of mounting civil penalties and regulatory oversight orders, appellate attorneys are adopting an aggressive jurisdictional challenge that aims to test long-settled precedents governing commercial fraud proceedings in New York State.',
      'The strategy, outlined in preliminary filings, focuses on whether statutory provisions intended for consumer protection were misapplied to sophisticated private real estate partnerships where all parties performed contractual due diligence.'
    ]
  },
  {
    id: 'fractured-legal-aides',
    section: 'U.S. Politics',
    page: 'Page A14',
    headline: 'Inside the Fractured Relationship Between Legal Aides',
    subhead: 'Former internal staffers recount clashes over trial presentation style and aggressive media counterprogramming.',
    summary: 'Former internal staffers recount clashes over trial presentation style and aggressive media counterprogramming.',
    byline: 'Jonathan Swan and Maggie Haberman',
    readTime: '5 MIN READ',
    date: 'Wednesday, Oct. 16, 2024',
    type: 'news',
    content: [
      'WASHINGTON — Behind the unified front presented on courtroom steps, former and current advisers describe an escalating rivalry between seasoned criminal defense litigators and the newer cohort of media-centric legal spokespersons.',
      'Tensions reached a fever pitch during closed-door strategy sessions last week over whether to prioritize procedural motions that preserve appellate arguments or engage in televised press conferences directly criticizing the presiding judge.'
    ]
  },
  {
    id: 'friedman-middle-east',
    section: 'Opinion',
    page: 'Page A23',
    headline: 'A Dangerous Illusion in the Middle East',
    subhead: 'Why current diplomatic frameworks misread the tectonic shifts taking place on the ground.',
    summary: 'Why current diplomatic frameworks misread the tectonic shifts taking place on the ground.',
    byline: 'Thomas L. Friedman',
    readTime: '6 MIN READ',
    date: 'Wednesday, Oct. 16, 2024',
    authorImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgfA8OYm57z8GyHbLgZSSlPAkIMGpFHDnYE2iDzICClzjlE1ZnC4V0-apdLK4FvrSVOIMrN6X1CJ1PKkYjRH82WleFiEmqzOG-PE9A1kh6bidpLQSQN-ZwY6w08GLuQvC8Jp5mLIMAKoLhZuEJAFPg8zE1zWm7ToxaCzApeCLI_Nb4i0g0jpKae7kWjFKcrxWESOiX8qowR_BlEvZPd5qyxO_NtLl0cqv9vQZNWCtoUwMPBQTX7tcC',
    isOpinion: true,
    type: 'opinion',
    audioMinutes: 6,
    pullQuote: 'You cannot solve a 21st-century ideological conflict with 20th-century geopolitical realpolitik maps.',
    content: [
      'JERUSALEM — If there is one thing that has become glaringly obvious across the Middle East in recent months, it is that the traditional diplomatic scripts being recited in Washington, London, and European capitals bear virtually no relationship to the reality taking shape on the ground.',
      'For decades, American policy rested upon the assumption that bilateral deterrence treaties and incremental economic incentives could contain non-state proxy networks. That architecture has collapsed.',
      'What we are observing today is not an ordinary diplomatic crisis that can be negotiated away through temporary ceasefires or ambassadorial dinners. It is a fundamental contest over sovereignty, national identity, and societal survival.',
      'Without a coherent regional political strategy that gives moderate Arab states and progressive Palestinians an actionable horizon, any tactical military achievements will quickly dissolve into enduring instability.'
    ]
  },
  {
    id: 'pamela-paul-education',
    section: 'Opinion',
    page: 'Page A23',
    headline: 'The Quiet Crisis in Public Education',
    subhead: 'Classroom discipline and reading fluency are facing headwinds we cannot afford to ignore.',
    summary: 'Classroom discipline and reading fluency are facing headwinds we cannot afford to ignore.',
    byline: 'Pamela Paul',
    readTime: '5 MIN READ',
    date: 'Wednesday, Oct. 16, 2024',
    authorImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCY9KyPq9loaKi0aizr28KpcAiuPTNQUs-obc6d7NCJ2OvYAa1qMTfFUsPDzQB5AyNIPbOIM9zvTo72jmHAfK5xuOA2k-i24EUpGvtXyjh-wKyRoHP7Wb1o9rYrM0bR5JPvBIuQzRCkTiMX07luzuax7axClejZGckUmc0ngvr1uw_ZRzVVkNix5dvmLbS1XM32av84rD4PvYFwBDOg7lnBqgSPSvXVH73N8bzI9qiqRIuUL6jodxGA',
    isOpinion: true,
    type: 'opinion',
    audioMinutes: 5,
    pullQuote: 'If children cannot read with effortless fluency by fourth grade, the door to independent intellectual discovery begins to close.',
    content: [
      'Walk into an elementary school classroom anywhere from suburban Ohio to central California, and you will hear teachers describing a reality that rarely surfaces in state assessment statistics.',
      'It is not merely that test scores dropped during pandemic disruptions and failed to rebound. It is that the basic habits of sustained attention, cooperative classroom decorum, and phonics-grounded literacy have frayed.',
      'For too many years, pedagogical fashion abandoned empirical reading science in favor of loose cueing systems. We are now paying the educational dividend of that mistake. Reclaiming foundational standards is neither reactionary nor punitive; it is the most compassionate service we can provide to young learners.'
    ]
  },
  {
    id: 'editorial-board-justice',
    section: 'Opinion',
    page: 'Page A22',
    headline: 'Protecting the Neutrality of the Justice System',
    subhead: 'The public trust requires steadfast adherence to nonpartisan judicial standards.',
    summary: 'The public trust requires steadfast adherence to nonpartisan judicial standards.',
    byline: 'The Editorial Board',
    readTime: '4 MIN READ',
    date: 'Wednesday, Oct. 16, 2024',
    isOpinion: true,
    type: 'opinion',
    pullQuote: 'The rule of law does not safeguard itself. It exists solely in the courage of magistrates and jurors willing to ignore political intimidation.',
    content: [
      'The American judicial system was conceived as a bulwark against factional passion. When political combatants routinely cast routine rulings as conspiratorial persecutions, they degrade the public confidence that gives judicial orders their binding moral authority.',
      'Judges at every level—from municipal traffic magistrates to the Supreme Court—have an obligation to conduct their proceedings with scrupulous impartiality and transparency. Simultaneously, civic leaders have an equal duty to defend the integrity of the bench against bad-faith attacks.'
    ]
  },
  {
    id: 'wirecutter-headphones',
    section: 'Wirecutter',
    kicker: 'Wirecutter Pick',
    page: 'Section W',
    headline: 'The Best Noise-Canceling Headphones for Commuters and Travelers',
    subhead: 'After testing 28 pairs across subway cars, loud coffee shops, and cross-country flights, one model reigns supreme.',
    summary: 'After testing 28 pairs across subway cars, loud coffee shops, and cross-country flights, one model reigns supreme.',
    byline: 'Lauren Dragan',
    readTime: '8 MIN READ',
    date: 'Wednesday, Oct. 16, 2024',
    type: 'wirecutter',
    keyTakeaways: [
      'Top Pick: Sony WH-1000XM5 remains the champion for absolute noise canceling and microphone clarity.',
      'Runner-Up: Bose QuietComfort Ultra provides slightly better ear cup cushioning for glasses wearers.',
      'Budget Pick: Anker Soundcore Space One delivers 85% of premium performance for under $100.'
    ],
    content: [
      'Whether you are trying to concentrate in an open-plan office or drown out engine drone on a transatlantic flight, active noise cancellation is no longer an optional luxury—it is an indispensable productivity tool.',
      'Our team spent over 120 combined hours measuring acoustic isolation, measuring frequency response with calibrated binaural microphones, and evaluating long-term headband clamping pressure.',
      'The Sony WH-1000XM5 earned our unanimous endorsement thanks to its dual-processor noise attenuation, lightweight 250-gram chassis, and class-leading 30-hour battery life with ANC enabled.'
    ]
  },
  {
    id: 'cooking-gnocchi',
    section: 'Cooking',
    kicker: 'NYT Cooking',
    page: 'Section D',
    headline: 'Crispy Sheet-Pan Gnocchi With Ricotta and Burst Tomatoes',
    subhead: 'Roasting packaged shelf-stable gnocchi on a high-heat baking sheet yields a golden, blistered crust with a pillowy interior.',
    summary: 'Roasting packaged shelf-stable gnocchi on a high-heat baking sheet yields a golden, blistered crust with a pillowy interior.',
    byline: 'Ali Slagle',
    readTime: '25 MIN PREP',
    date: 'Wednesday, Oct. 16, 2024',
    type: 'cooking',
    pullQuote: 'Skip the pot of boiling water altogether. High heat and olive oil transform gnocchi into crispy, golden potato croutons.',
    content: [
      'Most recipe traditions dictate dropping potato gnocchi into boiling salted water until they bob to the surface. But doing so often results in a dense, gummy texture.',
      'Roasting them directly on a sheet pan at 425°F with sweet cherry tomatoes, sliced garlic, and plenty of extra virgin olive oil changes the equation entirely. The exterior crisps like a roasted potato cube, while the inside remains tender.',
      'Toss the hot gnocchi with fresh basil leaves and dollops of cool, seasoned whole-milk ricotta right before serving.'
    ]
  },
  {
    id: 'world-diplomacy-berlin',
    section: 'World',
    kicker: 'Europe Bureau',
    page: 'Page A6',
    headline: 'European Powers Convene in Berlin to Anchor Eastern Border Defenses',
    subhead: 'Leaders from Germany, France, and Poland pledge new air-defense corridors and shared intelligence stations.',
    summary: 'Leaders from Germany, France, and Poland pledge new air-defense corridors and shared intelligence stations.',
    byline: 'Steven Erlanger and Erika Solomon',
    readTime: '5 MIN READ',
    date: 'Wednesday, Oct. 16, 2024',
    type: 'news',
    audioMinutes: 5,
    content: [
      'BERLIN — In an emergency summit held under tight security at the Chancellery, European leaders agreed on Wednesday to formalize a multi-nation deterrence perimeter along NATO’s eastern flank.',
      'The pact includes the co-financing of radar detection batteries and forward deployment of rapid-response drone interdiction squadrons starting early next spring.'
    ]
  },
  {
    id: 'arts-venice-biennale',
    section: 'Arts',
    kicker: 'Critic’s Notebook',
    page: 'Page C1',
    headline: 'At the Biennale, Contemporary Sculpture Reclaims the Weight of Stone',
    subhead: 'In an era dominated by ephemeral digital projections, sculptors in Venice turn back to granite, marble, and raw volcanic basalt.',
    summary: 'In an era dominated by ephemeral digital projections, sculptors in Venice turn back to granite, marble, and raw volcanic basalt.',
    byline: 'Jason Farago',
    readTime: '6 MIN READ',
    date: 'Wednesday, Oct. 16, 2024',
    type: 'news',
    content: [
      'VENICE — Stepping through the Arsenale this autumn, one is struck by an unexpected sensation: dust, gravity, and the tangible thud of chisel on stone.',
      'After a decade of glowing screens and ephemeral algorithmic installations, artists across continents appear to have concluded that permanence itself has become the most radical aesthetic proposition.'
    ]
  },
  {
    id: 'athletic-champions-league',
    section: 'The Athletic',
    kicker: 'European Football',
    page: 'Section S',
    headline: 'Tactical Precision and Tactical Chaos: How the Champions League New Format is Unfolding',
    subhead: 'The single 36-team league phase has dismantled traditional defensive safety nets, forcing managers to gamble early.',
    summary: 'The single 36-team league phase has dismantled traditional defensive safety nets, forcing managers to gamble early.',
    byline: 'Michael Cox and James Horncastle',
    readTime: '7 MIN READ',
    date: 'Wednesday, Oct. 16, 2024',
    type: 'news',
    content: [
      'Under the old four-team group stage, two cautious draws against direct competitors were standard operating procedure. Under the new 36-team Swiss model, goal differential across eight disparate fixtures has made conservative football a mathematical death sentence.',
      'Managers across the continent are being pushed to deploy high defensive blocks that would have been deemed reckless just twelve months ago.'
    ]
  }
];

export interface MiniCrosswordData {
  title: string;
  date: string;
  gridSize: number;
  grid: string[][];
  numbers: (number | null)[][];
  clues: {
    across: { num: number; clue: string; row: number; col: number; answer: string }[];
    down: { num: number; clue: string; row: number; col: number; answer: string }[];
  };
}

export const WEDNESDAY_MINI: MiniCrosswordData = {
  title: "Wednesday's Mini Crossword",
  date: "Wednesday, October 16, 2024",
  gridSize: 5,
  grid: [
    ['S', 'H', 'A', 'P', 'E'],
    ['P', 'A', 'P', 'E', 'R'],
    ['A', 'L', 'I', 'N', 'A'],
    ['R', 'E', 'A', 'D', 'S'],
    ['K', 'S', 'S', 'U', 'E']
  ],
  numbers: [
    [1, 2, 3, 4, 5],
    [6, null, null, null, null],
    [7, null, null, null, null],
    [8, null, null, null, null],
    [9, null, null, null, null]
  ],
  clues: {
    across: [
      { num: 1, clue: 'Circle, triangle, or square', row: 0, col: 0, answer: 'SHAPE' },
      { num: 6, clue: 'Daily news deliverable', row: 1, col: 0, answer: 'PAPER' },
      { num: 7, clue: 'First name of headline attorney Habba', row: 2, col: 0, answer: 'ALINA' },
      { num: 8, clue: 'Consumes frontpage journalism', row: 3, col: 0, answer: 'READS' },
      { num: 9, clue: 'Publication edition or topic of debate (Var.)', row: 4, col: 0, answer: 'ISSUE' }
    ],
    down: [
      { num: 1, clue: 'Igniting flash', row: 0, col: 0, answer: 'SPARK' },
      { num: 2, clue: 'Courthouse corridor', row: 0, col: 1, answer: 'HALES' },
      { num: 3, clue: 'Beehive state peak', row: 0, col: 2, answer: 'APIAS' },
      { num: 4, clue: 'Pending court calendar status', row: 0, col: 3, answer: 'PEN DU' },
      { num: 5, clue: 'Eras of human history', row: 0, col: 4, answer: 'ERASE' }
    ]
  }
};
