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
    image: "/Image/Image.png"
  },
  {
    id: "2",
    slug: "uk-visa-fees-increase-2026",
    title: "UK Visa Fees Increased (April 2026): What You Need to Know",
    category: "Legal Updates",
    date: "April 8, 2026",
    excerpt: "The Home Office has announced a significant increase in visa application fees across most categories. Learn how these changes affect your upcoming application.",
    content: `
      <p>Effective from April 8, 2026, the UK Home Office has implemented a revised fee structure for immigration and nationality applications. This increase aims to fund the UK's border and migration system while ensuring that those who benefit from the system contribute to its upkeep.</p>

      <h2>Key Fee Changes for 2026</h2>
      <p>Most visa categories have seen an increase of approximately 5-10%. Below is a summary of the most common visa types and their new application fees:</p>
      
      <table class="blog-table">
        <thead>
          <tr>
            <th>Visa Category</th>
            <th>Old Fee (2025)</th>
            <th>New Fee (2026)</th>
            <th>Increase</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Skilled Worker Visa</td>
            <td>£827</td>
            <td>£915</td>
            <td>+10%</td>
          </tr>
          <tr>
            <td>Spouse/Partner Visa (Outside UK)</td>
            <td>£1,846</td>
            <td>£2,064</td>
            <td>+11.8%</td>
          </tr>
          <tr>
            <td>Student Visa (Outside UK)</td>
            <td>£490</td>
            <td>£540</td>
            <td>+10.2%</td>
          </tr>
          <tr>
            <td>Standard Visitor Visa (6 Months)</td>
            <td>£115</td>
            <td>£125</td>
            <td>+8.7%</td>
          </tr>
          <tr>
            <td>Indefinite Leave to Remain (ILR)</td>
            <td>£2,885</td>
            <td>£3,150</td>
            <td>+9.2%</td>
          </tr>
        </tbody>
      </table>

      <div class="warning-box">
        <strong>Important:</strong> These fees do not include the Immigration Health Surcharge (IHS), which has also been adjusted for inflation in 2026.
      </div>

      <h2>Priority and Super Priority Services</h2>
      <p>The cost for expedited processing has also been revised. The Priority Service (decision in 5 days) now costs £500, while the Super Priority Service (next-day decision) has increased to £1,000 in addition to the standard application fee.</p>

      <h2>Strategic Planning for Applicants</h2>
      <p>Given the rising costs, we recommend applicants to:</p>
      <ul>
        <li><strong>Apply Early:</strong> If you are eligible now, apply before any further mid-year adjustments.</li>
        <li><strong>Double-Check Evidence:</strong> Refusals are now more expensive than ever. Ensuring your application is "right first time" is critical.</li>
        <li><strong>Budget for IHS:</strong> Always calculate the total cost including the Health Surcharge to avoid surprises.</li>
      </ul>

      <p>At our firm, we provide fixed-fee legal representation to help you navigate these rising costs without additional hidden legal expenses. Contact our specialists today to discuss your case.</p>
    `,
    image: "/Image/hero.webp"
  }
];
