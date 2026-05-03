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
        <li>Both partners must be at least 18 years old at the time of application.</li>
      </ul>

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
    slug: "uk-immigration-bail-explained",
    title: "UK Immigration Bail Explained: Eligibility, Conditions, and Guide",
    category: "Legal Updates",
    date: "May 03, 2026",
    excerpt: "If you or someone you know is being held by the Home Office, immigration bail may be the fastest way to secure release while your case is still being dealt with.",
    content: `
      <p>If you or someone you know is being held by the Home Office in an immigration removal centre, a detention centre or a prison, immigration bail may be the fastest way to secure release while your case is still being dealt with. It is not a solution to your immigration situation, but it does allow you to live in the community, with conditions, rather than remaining in detention.</p>


      <p>This guide explains what immigration bail is, who can apply, what conditions are typically imposed, and how to go through the application process step by step.</p>

      <h2>Key Points</h2>

      <ul>
        <li><strong>Day 1:</strong> You can apply from the day you arrive in detention</li>
        <li><strong>7 days:</strong> Minimum time detained before applying to the Tribunal</li>
        <li><strong>28 days:</strong> Wait before reapplying after a refusal</li>
        <li><strong>BAIL401:</strong> The form used to apply to the Home Office</li>
      </ul>

      <h2>1. What Immigration Bail Is and What It Is Not</h2>
      <p>Immigration bail is a legal status that allows a person who is detained or could be detained by the Home Office to live in the community instead of being held in a detention centre. It is governed by Schedule 10 of the Immigration Act 2016.</p>
      <p>Getting bail does not mean your immigration case has been resolved. It does not give you permission to stay in the UK permanently and it does not mean the Home Office has decided in your favour.</p>
      <div class="warning-box">
        <strong>Important:</strong> Immigration bail is not the same as leave to remain.
      </div>

      <h2>2. Who Can Apply for Immigration Bail</h2>
      <p>Anyone who is being held by the Home Office on immigration grounds, or who could be held, is eligible.</p>
      <h3>Includes:</h3>
      <ul>
        <li>People detained in an immigration removal centre</li>
        <li>People in prison for immigration reasons</li>
        <li>People liable to detention</li>
        <li>Asylum seekers</li>
        <li>People with ongoing appeals</li>
        <li>People waiting for judicial review</li>
        <li>People facing deportation</li>
      </ul>

      <h3>Strong application factors:</h3>
      <ul>
        <li>Confirmed address</li>
        <li>Financial condition supporter</li>
        <li>Strong UK ties</li>
        <li>Good compliance history</li>
        <li>Not a public risk</li>
        <li>Active immigration case</li>
      </ul>

      <h2>3. The Two Ways to Apply</h2>
      <table class="blog-table">
        <thead>
          <tr>
            <th>Home Office Bail</th>
            <th>First-tier Tribunal Bail</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Decision by caseworker</td>
            <td>Decision by judge</td>
          </tr>
          <tr>
            <td>Apply from day 1</td>
            <td>Apply after 7 days</td>
          </tr>
          <tr>
            <td>Use form BAIL401</td>
            <td>Includes hearing</td>
          </tr>
        </tbody>
      </table>

      <h2>4. Step by Step Guide</h2>
      <ol>
        <li>Get form BAIL401</li>
        <li>Confirm address</li>
        <li>Find financial supporter</li>
        <li>Submit form</li>
        <li>Wait for decision</li>
        <li>Apply to Tribunal if needed</li>
        <li>Attend hearing</li>
        <li>Receive decision</li>
      </ol>

      <h2>5. Conditions</h2>
      <p>Common conditions imposed on bail include:</p>
      <ul>
        <li>Regular reporting</li>
        <li>Residence requirement</li>
        <li>Electronic tag</li>
        <li>Work restrictions</li>
        <li>Study restrictions</li>
        <li>Financial condition</li>
        <li>Curfew</li>
      </ul>

      <h2>6. Financial Condition Supporter</h2>
      <p>A person who agrees to pay money if you break bail conditions.</p>
      <h3>Requirements:</h3>
      <ul>
        <li>Understand responsibility</li>
        <li>Financial capability</li>
        <li>Relationship proof</li>
        <li>Supporting evidence</li>
      </ul>

      <h2>7. Bail Hearing</h2>
      <p>A short hearing where a judge reviews the case. Both sides present arguments, and the decision is based on risk and circumstances.</p>

      <h2>8. If Bail is Refused</h2>
      <p>If refused, you stay in detention. You must wait 28 days to reapply to the Tribunal, but you can reapply to the Home Office at any time.</p>

      <h2>9. Breach of Conditions</h2>
      <p>Breaching conditions (like missing reporting or illegal work) can lead to re-detention and harm your immigration case.</p>

      <div class="warning-box">
        <strong>Note:</strong> Time on immigration bail does NOT count towards long residence settlement.
      </div>


    `,
    image: "/Image/Image (1).png"
  },

];
