export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  content: string;
  image?: string;
}

export const categories = [
  "Visa Guides",
  "Legal Updates",
  "Citizenship",
  "Case Studies"
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "uk-spouse-visa-requirements-2026",
    title: "UK Spouse Visa Requirements 2026: The Ultimate Guide",
    category: "Visa Guides",
    date: "April 29, 2026",
    excerpt: "The UK spouse visa allows the partner of a British citizen to live in the UK. In 2026, the process has become more rigorous with higher income thresholds...",
    content: `
      <p>The UK spouse visa allows the partner of a British citizen or settled person to live in the United Kingdom. In 2026, the process has become more rigorous with higher income thresholds and a transition to a digital-only visa system. This guide breaks down the essential requirements to help you prepare a successful application.</p>

      <h2>1. Eligibility: Who Can Apply and Sponsor?</h2>
      <p>To sponsor a partner, you must hold one of the following statuses:</p>
      <ul>
        <li>British Citizenship.</li>
        <li>Indefinite Leave to Remain (ILR) or Indefinite Leave to Enter.</li>
        <li>EU Settled Status (Note: Pre-settled status is insufficient).</li>
        <li>Refugee Status or Humanitarian Protection.</li>
      </ul>
      <p>Both partners must be at least 18 years old at the time of application.</p>

      <h2>2. The 2026 Financial Requirement</h2>
      <p>The sponsor must demonstrate a minimum gross income of £29,000 per year. This ensures the couple can live in the UK without relying on public funds.</p>
      
      <table class="blog-table">
        <thead>
          <tr>
            <th>Method</th>
            <th>Requirement</th>
            <th>Evidence Needed</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Employment</td>
            <td>£29,000 gross/year</td>
            <td>Payslips & employer letter</td>
          </tr>
          <tr>
            <td>Self-Employment</td>
            <td>£29,000 net profit/year</td>
            <td>Full accounts & HMRC return</td>
          </tr>
          <tr>
            <td>Savings</td>
            <td>£88,500 (6 months)</td>
            <td>Bank statements (6 months)</td>
          </tr>
          <tr>
            <td>Pension</td>
            <td>Full amount counts</td>
            <td>Proof of payments</td>
          </tr>
        </tbody>
      </table>

      <div class="warning-box">
        <strong>Warning:</strong> Income from Universal Credit, Housing Benefit, or Child Benefit does not count toward this requirement.
      </div>

      <h2>3. English Language Proficiency</h2>
      <p>Applicants must prove their ability to speak and understand English. The required level increases as you progress:</p>
      <ul>
        <li>Initial Visa: Level A1.</li>
        <li>Extension: Level A2.</li>
        <li>Settlement (ILR): Level B1.</li>
      </ul>
      <p><strong>Exemptions:</strong> Nationals of majority English-speaking countries or those with a degree taught in English recognized by UK ENIC are exempt.</p>

      <h2>4. Proving Your Relationship is Genuine</h2>
      <p>Relationship evidence is the most common reason for refusals. You must provide:</p>
      <ul>
        <li>Communication Logs: Messages/calls covering 12+ months.</li>
        <li>Photographs: Photos together from various dates with notes.</li>
        <li>Travel Evidence: Joint trips or visit history.</li>
        <li>Shared Finances: Joint accounts, bills, or tenancy.</li>
      </ul>

      <h2>5. Fees and Processing Times</h2>
      <ul>
        <li>Application Fee (Outside UK): £2,064.</li>
        <li>Application Fee (Inside UK): £1,407.</li>
        <li>Health Surcharge: ~£3,105 for 30 months.</li>
        <li>Processing Time: ~12 weeks (Standard).</li>
      </ul>

      <h2>6. The Road to British Citizenship</h2>
      <p>The spouse visa is a 5-year route:</p>
      <ol>
        <li>Initial Visa: 33 months (abroad).</li>
        <li>Extension: 30 months (after 2.5 years).</li>
        <li>Settlement (ILR): After 5 years.</li>
        <li>Citizenship: 12 months after settlement.</li>
      </ol>
      <p><strong>Crucial Rule:</strong> Must not spend more than 180 days outside the UK in any 12-month period.</p>
    `,
    image: "https://pix4free.org/assets/library/2021-01-21/originals/immigration_law.jpg"
  }
];
