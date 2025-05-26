import { Section } from "../components/infosection";

export const sections: Section[] = [
  {
    path: "personal",
    title: "Personal",
    description: "Comprehensive personal banking services tailored for you.",
    image: "personal.jpg",
    infoData: [
      {
        type: 'text',
        heading: "Overview",
        content: "Our personal banking services are thoughtfully designed to provide you with seamless financial management solutions that fit your everyday life. From everyday transactions to long-term savings and investments, we empower you with tools and support that make managing your money easier and more rewarding. Enjoy personalized products and services tailored to your unique needs and lifestyle."
      },
      {
        type: 'card',
        title: "Account Types",
        description: "We offer Savings, Checking, and Time Deposit accounts with competitive interest rates."
      },
      {
        type: 'card',
        title: "Customer Support",
        description: "24/7 customer service via phone, chat, and email to assist your banking needs."
      },
      {
        type: 'card',
        title: "Digital Banking",
        description: "Secure online and mobile banking platforms for convenient access anytime."
      },
      {
        type: 'text',
        heading: "Why Choose Us",
        content: "Choosing our bank means benefiting from transparent policies, innovative digital solutions, and dedicated support that prioritizes your financial security and growth. Our commitment is to make banking simple, accessible, and personalized so that you feel confident in every transaction and decision."
      },
    ],
  },
  {
    path: "philtrust-bankonline",
    title: "Philtrust BankOnline",
    description: "Access your accounts and perform transactions anytime, anywhere.",
    image: "philtrust-bankonline.jpg",
    infoData: [
      {
        type: 'text',
        heading: "Features",
        list: [
          "View account balances and statements",
          "Transfer funds instantly",
          "Pay bills and reload prepaid",
          "Secure login with 2-factor authentication",
          "Manage multiple accounts",
        ],
      },
      {
        type: 'card',
        title: "Mobile App",
        description: "Download our app for quick and easy banking on the go."
      },
      {
        type: 'card',
        title: "24/7 Availability",
        description: "Bank anytime with our always-on online platform."
      },
      {
        type: 'card',
        title: "Customer Care",
        description: "Get support through chat, phone, or email whenever you need."
      },
      {
        type: 'text',
        heading: "Security",
        content: "Our platform employs advanced encryption, multi-factor authentication, and continuous monitoring to protect your financial data and transactions. We prioritize your security so you can bank with peace of mind."
      },
    ],
  },
  {
    path: "instapay",
    title: "Instapay",
    description: "Fast and secure real-time fund transfers within the Philippines.",
    image: "instapay.jpg",
    infoData: [
      {
        type: 'card',
        title: "Transfer Limits",
        description: "Up to PHP 50,000 per transaction."
      },
      {
        type: 'card',
        title: "Network Partners",
        description: "Widely accepted by banks and e-wallets nationwide."
      },
      {
        type: 'card',
        title: "Fees",
        description: "Low transaction fees with instant confirmation."
      },
      {
        type: 'text',
        heading: "How it works",
        content: "Instapay allows you to send money instantly using your account number or mobile number. The system connects participating banks and financial institutions, enabling seamless real-time fund transfers. It’s designed for convenience and speed, so your recipient receives the money right away without the usual delays."
      },
      {
        type: 'text',
        heading: "Benefits",
        list: [
          "Convenient anytime transfers",
          "Immediate fund availability",
          "Safe and reliable platform",
        ],
      },
    ],
  },
  {
    path: "pesonet",
    title: "PESONet",
    description: "Batch fund transfers settled within the day.",
    image: "pesonet.jpg",
    infoData: [
      {
        type: 'card',
        title: "Cut-off Time",
        description: "Transactions processed before 3PM get same-day settlement."
      },
      {
        type: 'card',
        title: "Ideal Use Cases",
        description: "Perfect for bulk payroll and supplier payments."
      },
      {
        type: 'card',
        title: "Transaction Limits",
        description: "Up to PHP 2 million per transaction."
      },
      {
        type: 'text',
        heading: "Ideal for",
        list: [
          "Payroll disbursements",
          "Supplier payments",
          "Bulk transactions",
        ],
      },
      {
        type: 'text',
        heading: "Settlement Process",
        content: "PESONet processes batch fund transfers efficiently with settlements completed within the banking day. This ensures funds are available quickly, reducing processing times and enhancing cash flow management for businesses and individuals. The system’s reliability and speed make it a preferred choice for bulk and corporate payments."
      },
    ],
  },
  {
    path: "savings-deposit",
    title: "Savings and Deposit",
    description: "Grow your savings with competitive interest rates and flexible terms.",
    image: "savings-deposit.jpg",
    infoData: [
      {
        type: 'card',
        title: "Savings Account",
        description: "Earn interest while keeping funds accessible."
      },
      {
        type: 'card',
        title: "Time Deposit",
        description: "Higher interest rates with fixed terms from 30 days to 5 years."
      },
      {
        type: 'card',
        title: "ATM Access",
        description: "Withdraw your funds anytime with our wide ATM network."
      },
      {
        type: 'card',
        title: "Online Management",
        description: "Manage deposits through our online banking platform."
      },
      {
        type: 'text',
        heading: "Advantages",
        content: "Our savings and deposit products are designed to provide financial growth and flexibility. Whether you need instant access to your money or prefer to lock in higher interest rates with a fixed term, we offer plans tailored to fit your lifestyle and goals. With easy access and online management, your funds are always within reach."
      },
    ],
  },
  {
    path: "personal-trust-services",
    title: "Personal Trust Services",
    description: "Secure your assets and manage your estate efficiently.",
    image: "personal-trust-services.jpg",
    infoData: [
      {
        type: 'text',
        heading: "Services Offered",
        list: [
          "Estate planning",
          "Will and trust administration",
          "Asset management",
          "Financial advisory",
        ],
      },
      {
        type: 'card',
        title: "Estate Planning",
        description: "Comprehensive strategies to protect your legacy."
      },
      {
        type: 'card',
        title: "Trust Administration",
        description: "Professional management of trusts tailored to your wishes."
      },
      {
        type: 'card',
        title: "Investment Services",
        description: "Expert portfolio management to grow your assets."
      },
      {
        type: 'text',
        heading: "Why Trust Us",
        content: "Our personal trust services are backed by experienced fiduciaries dedicated to safeguarding your family’s future. We offer personalized estate planning and asset management solutions that ensure your legacy is preserved and your wishes are honored with professionalism and care."
      },
    ],
  },
  {
    path: "other-services",
    title: "Other Services",
    description: "A wide range of banking services designed to meet your unique needs.",
    image: "other-services.jpg",
    infoData: [
      {
        type: 'card',
        title: "Foreign Exchange",
        description: "Competitive rates for currency exchange."
      },
      {
        type: 'card',
        title: "Remittance",
        description: "Send money abroad with ease."
      },
      {
        type: 'card',
        title: "Insurance",
        description: "Protect yourself and your family with our insurance plans."
      },
      {
        type: 'card',
        title: "Wealth Management",
        description: "Tailored solutions for high-net-worth individuals."
      },
      {
        type: 'text',
        heading: "Additional Services",
        content: "In addition to our core banking products, we offer comprehensive financial planning, investment advisory, and personalized wealth management services. Our goal is to support your financial well-being through every stage of life with customized solutions."
      },
    ],
  },
  {
    path: "safety-deposit-box",
    title: "Safety Deposit Box",
    description: "Keep your valuables and important documents safe and secure.",
    image: "safety-deposit-box.jpg",
    infoData: [
      {
        type: 'text',
        heading: "Benefits",
        list: [
          "High-security vault",
          "Easy access during banking hours",
          "Affordable rental rates",
          "Insurance options available",
        ],
      },
      {
        type: 'card',
        title: "Security Features",
        description: "State-of-the-art vault with 24/7 monitoring and controlled access."
      },
      {
        type: 'card',
        title: "Flexible Rentals",
        description: "Choose rental periods from monthly to yearly."
      },
      {
        type: 'card',
        title: "Convenience",
        description: "Access your box anytime during bank hours with proper ID."
      },
    ],
  },
  {
  path: "business",
  title: "Business",
  description: "Banking solutions tailored for your business growth and success.",
  image: "business.jpg",
  infoData: [
    {
      type: 'text',
      heading: "Business Banking Overview",
      content: "Our business banking services are designed to support companies of all sizes—from startups to large enterprises. We provide flexible financial solutions, customized account management, and expert advisory services that help you manage your cash flow, optimize working capital, and grow your business with confidence."
    },
    {
      type: 'card',
      title: "Business Accounts",
      description: "Checking and savings accounts designed for businesses with added features."
    },
    {
      type: 'card',
      title: "Cash Management",
      description: "Tools to manage your receivables, payables, and liquidity efficiently."
    },
    {
      type: 'card',
      title: "Merchant Services",
      description: "Secure payment processing solutions tailored for your business."
    },
    {
      type: 'text',
      heading: "Why Choose Our Business Banking",
      content: "We provide personalized banking experiences with dedicated relationship managers, easy online banking tools, and financial products crafted to meet your unique business needs. Our goal is to empower you with resources that help your business thrive in competitive markets."
    },
  ],
},
{
  path: "corporate-loans",
  title: "Corporate Loans",
  description: "Flexible financing solutions to fuel your corporate growth.",
  image: "corporate-loans.jpg",
  infoData: [
    {
      type: 'text',
      heading: "Loan Products",
      list: [
        "Working capital loans",
        "Equipment financing",
        "Project financing",
        "Term loans",
      ],
    },
    {
      type: 'card',
      title: "Competitive Interest Rates",
      description: "Attractive rates with flexible repayment terms."
    },
    {
      type: 'card',
      title: "Customized Loan Solutions",
      description: "Tailored financing options to match your corporate objectives."
    },
    {
      type: 'card',
      title: "Fast Approval Process",
      description: "Streamlined application and quick decision-making."
    },
    {
      type: 'text',
      heading: "Benefits",
      content: "Our corporate loan offerings are designed to support your business expansion, equipment acquisition, and working capital needs. With competitive rates and flexible terms, you get financing that aligns with your strategic plans and helps maintain operational stability."
    },
  ],
},
{
  path: "international-services",
  title: "International Services",
  description: "Comprehensive services to support your global business needs.",
  image: "international-services.jpg",
  infoData: [
    {
      type: 'text',
      heading: "Global Banking Solutions",
      content: "We offer a wide range of international banking services, including foreign currency accounts, trade finance, international wire transfers, and foreign exchange solutions. Our network and expertise help you navigate global markets with ease and confidence."
    },
    {
      type: 'card',
      title: "Trade Finance",
      description: "Letters of credit, guarantees, and export-import financing."
    },
    {
      type: 'card',
      title: "Foreign Exchange",
      description: "Competitive rates for currency conversion and hedging."
    },
    {
      type: 'card',
      title: "International Wire Transfers",
      description: "Secure and fast cross-border money transfers."
    },
    {
      type: 'text',
      heading: "Why Choose Our International Services",
      content: "Our international banking team is committed to providing tailored support for your cross-border transactions. With access to a global network and personalized service, we ensure your international operations run smoothly and compliantly."
    },
  ],
},
{
  path: "international-servoces",  // Assuming this is a typo duplicate? If so, you might want to merge or rename
  title: "International Services (Alternate)",
  description: "Extended international banking and trade support.",
  image: "international-servoces.jpg",
  infoData: [
    {
      type: 'text',
      heading: "Extended Services",
      content: "Beyond basic international banking, we provide specialized trade advisory, global cash management, and multi-currency financing solutions. Our services cater to complex international business requirements to streamline your operations worldwide."
    },
    {
      type: 'card',
      title: "Trade Advisory",
      description: "Expert advice on international trade regulations and compliance."
    },
    {
      type: 'card',
      title: "Global Cash Management",
      description: "Centralized management of your international cash flows."
    },
    {
      type: 'card',
      title: "Multi-Currency Financing",
      description: "Loans and credit lines in multiple currencies to mitigate risk."
    },
    {
      type: 'text',
      heading: "Our Commitment",
      content: "We understand the complexities of global business and are dedicated to providing innovative solutions and personalized service that meet your international banking needs efficiently and securely."
    },
  ],
},

 {
    path: "our-bank",
    title: "About Our Bank",
    description: "An overview of our bank’s identity, commitment, and services.",
    image: "about-our-bank.jpg",
    infoData: [
      {
        type: "text",
        heading: "About Our Bank",
        content: `
          Our bank has been a cornerstone of financial service excellence for decades.
          We are committed to supporting individuals, businesses, and communities by providing innovative banking solutions tailored to their unique needs.
          Guided by our core values of integrity, customer focus, and reliability, we continuously strive to build lasting relationships with our clients.
          Our vision is to be a trusted partner that empowers economic growth and financial well-being.
        `
      }
    ]
  },



 {
    path: "corporate-profile",
    title: "Corporate Profile",
    description: "An extensive overview of our company’s identity, operations, and strategic outlook.",
    image: "corporate-profile.jpg",
    infoData: [
      {
        type: "text",
        heading: "Corporate Profile",
        content: `
          Our corporate profile offers a detailed insight into who we are as a company, highlighting our core competencies and market presence.
          Established with a vision to create value and innovate, we have steadily grown into a reputable institution known for our commitment to excellence.
          We emphasize transparency, quality service delivery, and sustainable business practices that ensure long-term benefits for our clients and stakeholders.
          Our corporate ethos revolves around fostering strong partnerships and continuously adapting to changing market dynamics while maintaining our foundational values.
        `
      }
    ]
  },
  {
    path: "history",
    title: "History",
    description: "A thorough account of our company’s origins, development, and significant milestones.",
    image: "history.jpg",
    infoData: [
      {
        type: "text",
        heading: "History",
        content: `
          Our journey began in [Founding Year], rooted in a small but ambitious initiative to transform the industry.
          Over the years, we have overcome numerous challenges and embraced opportunities that have allowed us to expand our footprint locally and internationally.
          Key milestones include strategic acquisitions, technological advancements, and expanding our service portfolio.
          The company’s resilience and adaptability have been central to its success, enabling us to build a strong brand reputation and a loyal customer base.
        `
      }
    ]
  },
  {
    path: "mission-vision-values",
    title: "Mission, Vision and Values",
    description: "The principles and aspirations guiding our company’s growth and culture.",
    image: "mission-vision-values.jpg",
    infoData: [
      {
        type: "text",
        heading: "Mission",
        content: `
          Our mission is to deliver innovative solutions that meet the evolving needs of our clients while fostering a culture of integrity and excellence.
          We are committed to operational efficiency, sustainability, and social responsibility as we create value for all our stakeholders.
        `
      },
      {
        type: "text",
        heading: "Vision",
        content: `
          We envision becoming a global leader recognized for innovation, quality, and customer-centric solutions.
          Our vision includes expanding our reach and influence while maintaining a commitment to ethical business practices and sustainable growth.
        `
      },
      {
        type: "text",
        heading: "Values",
        content: `
          Our core values define our identity and guide our decision-making:
          - Integrity: Upholding honesty and transparency in all dealings.
          - Accountability: Taking responsibility for our actions and outcomes.
          - Innovation: Embracing change and continuous improvement.
          - Customer Focus: Prioritizing the needs and satisfaction of our clients.
          - Teamwork: Encouraging collaboration and respect among all stakeholders.
        `
      }
    ]
  },
  {
    path: "the-management",
    title: "The Management",
    description: "Introducing the leadership team steering the company towards success.",
    image: "the-management.jpg",
    infoData: [
      {
        type: "text",
        heading: "The Management Team",
        content: `
          Our management team comprises seasoned professionals with expertise across diverse sectors.
          Each member brings a unique perspective and a commitment to driving innovation, operational excellence, and ethical leadership.
          Together, they foster a culture of transparency, strategic thinking, and employee engagement.
          This leadership ensures the company remains agile, competitive, and aligned with our mission and vision.
        `
      },
      {
        type: "card",
        title: "Chief Executive Officer",
        description: "Provides strategic direction and oversees overall operations to ensure company growth and sustainability."
      },
      {
        type: "card",
        title: "Chief Financial Officer",
        description: "Manages financial planning, risk management, and reporting to maintain fiscal health."
      },
      {
        type: "card",
        title: "Chief Operations Officer",
        description: "Ensures efficient daily operations and implementation of strategic initiatives."
      },
      {
        type: "card",
        title: "Chief Technology Officer",
        description: "Leads technological innovation and integration to enhance company capabilities."
      }
    ]
  },
  {
    path: "organizational-chart",
    title: "Organizational Chart",
    description: "A visual guide to our company’s structure and functional divisions.",
    image: "organizational-chart.jpg",
    infoData: [
      {
        type: "text",
        heading: "Organizational Chart Overview",
        content: `
          The organizational chart clearly defines reporting relationships, departmental divisions, and key roles within our company.
          This structure promotes efficient communication, accountability, and collaboration across all levels.
          By understanding the hierarchy, employees and stakeholders can navigate processes more effectively, supporting better decision-making.
        `
      },
      {
        type: "card",
        title: "Executive Leadership",
        description: "Top-level executives responsible for strategic management and corporate governance."
      },
      {
        type: "card",
        title: "Operations Department",
        description: "Oversees production, service delivery, and quality control to meet organizational goals."
      },
      {
        type: "card",
        title: "Finance Department",
        description: "Handles budgeting, financial reporting, and resource allocation."
      },
      {
        type: "card",
        title: "Human Resources",
        description: "Manages recruitment, training, employee welfare, and compliance."
      }
    ]
  },
  {
    path: "shareholding-structure",
    title: "Shareholding Structure",
    description: "Details on ownership distribution and shareholder categories.",
    image: "shareholding-structure.jpg",
    infoData: [
      {
        type: "text",
        heading: "Shareholding Structure Overview",
        content: `
          Our shareholding structure reflects a balanced distribution among institutional investors, private stakeholders, and company founders.
          This balance ensures stability, effective governance, and alignment with long-term business objectives.
          Transparency in shareholder composition fosters trust and supports regulatory compliance.
          We regularly update and communicate shareholding information to maintain investor confidence and market integrity.
        `
      },
      {
        type: "card",
        title: "Major Shareholders",
        description: "Entities or individuals holding significant stakes that influence company policy and direction."
      },
      {
        type: "card",
        title: "Institutional Investors",
        description: "Professional organizations managing large portfolios and contributing to governance."
      },
      {
        type: "card",
        title: "Founders and Management",
        description: "Founding members and executives with ownership interests aligning leadership with shareholder goals."
      },
      {
        type: "card",
        title: "Public Shareholders",
        description: "Minority shareholders holding small proportions of equity, contributing to liquidity and market diversity."
      }
    ]
  },
  {
    path: "articles-of-incorporation",
    title: "Articles of Incorporation, By-Laws and Amendments",
    description: "Legal framework and governance documents regulating company operations.",
    image: "articles-of-incorporation.jpg",
    infoData: [
      {
        type: "text",
        heading: "Articles of Incorporation",
        content: `
          The Articles of Incorporation legally establish the company as a recognized business entity.
          They outline our purpose, authorized shares, board structure, and corporate powers.
          This foundational document ensures compliance with jurisdictional requirements and protects stakeholders’ interests.
        `
      },
      {
        type: "text",
        heading: "By-Laws",
        content: `
          By-Laws serve as internal rules governing company procedures, including shareholder meetings, elections, and officer responsibilities.
          They provide detailed guidance on organizational conduct and help maintain order and consistency in company affairs.
        `
      },
      {
        type: "text",
        heading: "Amendments",
        content: `
          Amendments reflect necessary updates to the Articles or By-Laws in response to regulatory changes, strategic decisions, or operational needs.
          Maintaining an accurate record of amendments ensures ongoing compliance and adaptability in governance.
        `
      },
      {
        type: "card",
        title: "Incorporation Document",
        description: "Establishes the company's legal existence and outlines its foundational structure."
      },
      {
        type: "card",
        title: "Corporate By-Laws",
        description: "Defines internal governance policies, procedures, and organizational rules."
      },
      {
        type: "card",
        title: "Recent Amendments",
        description: "Documents modifications and updates to original governance frameworks."
      },
      {
        type: "card",
        title: "Compliance Statements",
        description: "Ensures all corporate actions align with legal and regulatory requirements."
      }
    ]
  },
  {
  path: "investors",
  title: "Investor Relations",
  description: "Key information and updates for current and potential investors.",
  image: "investor-relations.jpg",
  infoData: [
    {
      type: "text",
      heading: "Investor Relations",
      content: `
        At our bank, we believe transparency, accountability, and sustainable growth are the pillars of strong investor relations.
        We are committed to delivering long-term value for our shareholders through responsible governance and strategic investments.
        Our investor relations page provides timely financial reports, corporate disclosures, and performance updates to keep our investors well-informed.
        We invite investors to explore our growth story, leadership strategy, and commitment to financial excellence.
      `
    },
    {
      type: "card",
      title: "Incorporation Document",
      description: "Establishes the company's legal existence and outlines its foundational structure.",
  
    },
    {
      type: "card",
      title: "Corporate By-Laws",
      description: "Defines internal governance policies, procedures, and organizational rules.",
     
    },
    {
      type: "card",
      title: "Recent Amendments",
      description: "Documents modifications and updates to original governance frameworks.",

    },
    {
      type: "card",
      title: "Compliance Statements",
      description: "Ensures all corporate actions align with legal and regulatory requirements.",
   
    }
  ]
}


];
