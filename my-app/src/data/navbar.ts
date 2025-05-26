export const menuData = [
  {
    label: "Personal",
    path: "/personal",  // matches otherSections path
    subItems: [
      {
        label: "Philtrust BankOnline",
        path: "/philtrust-bankonline",  // updated to match section path
        subItems: [
          { label: "Instapay", path: "/instapay" },
          { label: "PESONet", path: "/pesonet" },
        ],
      },
      {
        label: "Loans",
        path: "/loans",  // your loan section path from earlier was "personal"
      },
      {
        label: "Savings and Deposit",
        path: "/savings-deposit",
      },
      {
        label: "Personal Trust Services",
        path: "/personal-trust-services",
      },
      {
        label: "Other Services",
        path: "/other-services",
        subItems: [
          { label: "Safety Deposit Box", path: "/safety-deposit-box" },
        ],
      },
    ],
  },
  {
    label: "Business",
    path: "/business",
    subItems: [
      {
        label: "Corporate Loans",
        path: "/corporate-loans",

      },
      {
        label: "International Services",
        path: "/international-services",

      },
      {
        label: "International Servoces",
        path: "/philtrust",

      },
    ]
  },
  {
    label: "Our Bank",
    path: "/our-bank",
    subItems: [
      {
        label: "Corporate Profile",
        path: "/corporate-profile",

      },
      {
        label: "History",
        path: "/history",

      },
      {
        label: "Mission, Vision and Values",
        path: "/mvv",

      },
      {
        label: "The Management",
        path: "/management",

      },
      {
        label: "Organizational Chart",
        path: "/org-chart",

      },
      {
        label: "Shareholding Structure",
        path: "/shareholder-structure",

      },
        {
        label: "Article of Incorporation, By-Laws and Amendments",
        path: "/laws-articles",

      },
      
    ]
  },
  {
    label: "For Investors",
    path: "/investors",
     subItems: [
      {
        label: "Corporate Governance",
        path: "/corporate-governance",

      },
      {
        label: "Company Policies",
        path: "/company-policies",

      },
      {
        label: "Company Disclosures",
        path: "/company-disclosures",

      },
      
     ]
  },

   {
    label: "Contact Us",
    path: "/contact-us",
     subItems: [
      {
        label: "Branch Locator",
        path: "/branch",

      },
      {
        label: "Properties",
        path: "/properties",

      },
      {
        label: "Careers",
        path: "/careers",

      },
      
     ]
  },

];
