'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {

      await queryInterface.bulkInsert('Tags', [
        {
          name: "1",  
          description: 'ADMINISTRACION PUBLICA',
          type: "thematic",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          name: "2",  
          description: 'AGROALIMENTACION',
          type: "thematic",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          name: "3",  
          description: 'ARTE',
          type: "thematic",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          name: "4",  
          description: 'CIENCIA',
          type: "thematic",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          name: "5",  
          description: 'CINE',
          type: "thematic",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          name: "6",  
          description: 'COMERCIO',
          type: "thematic",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          name: "7",  
          description: 'COMUNICACIONES',
          type: "thematic",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          name: "8",  
          description: 'CONFLICTOS',
          type: "thematic",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          name: "9",  
          description: 'CONSUMO',
          type: "thematic",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          name: "10",  
          description: 'CULTURA',
          type: "thematic",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          name: "11",  
          description: 'DEFENSA',
          type: "thematic",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          name: "12",  
          description: 'DEPORTES',
          type: "thematic",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          name: "13",  
          description: 'ECONOMIA',
          type: "thematic",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          name: "14",  
          description: 'EDUCACION',
          type: "thematic",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          name: "15",  
          description: 'ENERGIA',
          type: "thematic",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          name: "16",  
          description: 'ESPECTACULOS',
          type: "thematic",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          name: "17",  
          description: 'ESTADISTICAS',
          type: "thematic",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          name: "18",  
          description: 'ESTILO VIDA',
          type: "thematic",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          name: "19",  
          description: 'FIESTAS',
          type: "thematic",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          name: "20",  
          description: 'FINANZAS',
          type: "thematic",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          name: "21",  
          description: 'HISTORIA',
          type: "thematic",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          name: "22",  
          description: 'INDUSTRIA',
          type: "thematic",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          name: "23",  
          description: 'JUSTICIA',
          type: "thematic",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          name: "24",  
          description: 'MEDIO AMBIENTE',
          type: "thematic",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          name: "25",  
          description: 'MEDIOS COMUNICACION',
          type: "thematic",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          name: "26",  
          description: 'METEOROLOGIA',
          type: "thematic",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          name: "27",  
          description: 'MUSICA',
          type: "thematic",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          name: "28",  
          description: 'POLITICA',
          type: "thematic",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          name: "29",  
          description: 'RELACIONES EXTERIORES',
          type: "thematic",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          name: "30",  
          description: 'RELIGION',
          type: "thematic",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          name: "31",  
          description: 'SALUD',
          type: "thematic",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          name: "32",  
          description: 'SOCIEDAD',
          type: "thematic",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          name: "33",  
          description: 'SUCESOS',
          type: "thematic",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          name: "34",  
          description: 'TERRORISMO',
          type: "thematic",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          name: "35",  
          description: 'TRABAJO',
          type: "thematic",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          name: "36",  
          description: 'TRANSPORTE',
          type: "thematic",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          name: "37",  
          description: 'TURISMO',
          type: "thematic",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          name: "38",  
          description: 'URBANISMO',
          type: "thematic",
          createdAt: new Date(),
          updatedAt: new Date()
        }

        ,
        {
          name: "IAB1",
          description: "Arts & Entertainment",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB1-1",
          description: "Books & Literature",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB1-2",
          description: "Celebrity Fan/Gossip",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB1-3",
          description: "Fine Art",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB1-4",
          description: "Humor",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB1-5",
          description: "Movies",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB1-6",
          description: "Music",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB1-7",
          description: "Television",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB2",
          description: "Automotive",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB2-1",
          description: "Auto Parts",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB2-2",
          description: "Auto Repair",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB2-3",
          description: "Buying/Selling Cars",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB2-4",
          description: "Car Culture",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB2-5",
          description: "Certified Pre-Owned",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB2-6",
          description: "Convertible",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB2-7",
          description: "Coupe",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB2-8",
          description: "Crossover",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB2-9",
          description: "Diesel",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB2-10",
          description: "Electric Vehicle",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB2-11",
          description: "Hatchback",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB2-12",
          description: "Hybrid",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB2-13",
          description: "Luxury",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB2-14",
          description: "MiniVan",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB2-15",
          description: "Mororcycles",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB2-16",
          description: "Off-Road Vehicles",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB2-17",
          description: "Performance Vehicles",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB2-18",
          description: "Pickup",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB2-19",
          description: "Road-Side Assistance",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB2-20",
          description: "Sedan",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB2-21",
          description: "Trucks & Accessories",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB2-22",
          description: "Vintage Cars",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB2-23",
          description: "Wagon",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB3",
          description: "Business",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB3-1",
          description: "Advertising",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB3-2",
          description: "Agriculture",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB3-3",
          description: "Biotech/Biomedical",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB3-4",
          description: "Business Software",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB3-5",
          description: "Construction",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB3-6",
          description: "Forestry",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB3-7",
          description: "Government",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB3-8",
          description: "Green Solutions",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB3-9",
          description: "Human Resources",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB3-10",
          description: "Logistics",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB3-11",
          description: "Marketing",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB3-12",
          description: "Metals",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB4",
          description: "Careers",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB4-1",
          description: "Career Planning",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB4-2",
          description: "College",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB4-3",
          description: "Financial Aid",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB4-4",
          description: "Job Fairs",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB4-5",
          description: "Job Search",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB4-6",
          description: "Resume Writing/Advice",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB4-7",
          description: "Nursing",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB4-8",
          description: "Scholarships",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB4-9",
          description: "Telecommuting",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB4-10",
          description: "U.S. Military",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB4-11",
          description: "Career Advice",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB5",
          description: "Education",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB5-1",
          description: "7-12 Education",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB5-2",
          description: "Adult Education",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB5-3",
          description: "Art History",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB5-4",
          description: "College Administration",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB5-5",
          description: "College Life",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB5-6",
          description: "Distance Learning",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB5-7",
          description: "English as a 2nd Language",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB5-8",
          description: "Language Learning",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB5-9",
          description: "Graduate School",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB5-10",
          description: "Homeschooling",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB5-11",
          description: "Homework/Study Tips",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB5-12",
          description: "K-6 Educators",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB5-13",
          description: "Private School",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB5-14",
          description: "Special Education",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB5-15",
          description: "Studying Business",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB6",
          description: "Family & Parenting",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB6-1",
          description: "Adoption",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB6-2",
          description: "Babies & Toddlers",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB6-3",
          description: "Daycare/Pre School",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB6-4",
          description: "Family Internet",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB6-5",
          description: "Parenting - K-6 Kids",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB6-6",
          description: "Parenting teens",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB6-7",
          description: "Pregnancy",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB6-8",
          description: "Special Needs Kids",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB6-9",
          description: "Eldercare",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7",
          description: "Health & Fitness",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-1",
          description: "Exercise",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-2",
          description: "A.D.D.",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-3",
          description: "AIDS/HIV",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-4",
          description: "Allergies",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-5",
          description: "Alternative Medicine",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-6",
          description: "Arthritis",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-7",
          description: "Asthma",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-8",
          description: "Autism/PDD",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-9",
          description: "Bipolar Disorder",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-10",
          description: "Brain Tumor",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-11",
          description: "Cancer",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-12",
          description: "Cholesterol",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-13",
          description: "Chronic Fatigue Syndrome",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-14",
          description: "Chronic Pain",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-15",
          description: "Cold & Flu",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-16",
          description: "Deafness",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-17",
          description: "Dental Care",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-18",
          description: "Depression",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-19",
          description: "Dermatology",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-20",
          description: "Diabetes",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-21",
          description: "Epilepsy",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-22",
          description: "GERD/Acid Reflux",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-23",
          description: "Headaches/Migraines",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-24",
          description: "Heart Disease",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-25",
          description: "Herbs for Health",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-26",
          description: "Holistic Healing",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-27",
          description: "IBS/Crohn’s Disease",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-28",
          description: "Incest/Abuse Support",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-29",
          description: "Incontinence",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-30",
          description: "Infertility",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-31",
          description: "Men’s Health",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-32",
          description: "Nutrition",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-33",
          description: "Orthopedics",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-34",
          description: "Panic/Anxiety Disorders",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-35",
          description: "Pediatrics",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-36",
          description: "Physical Therapy",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-37",
          description: "Psychology/Psychiatry",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-38",
          description: "Senior Health",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-39",
          description: "Sexuality",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-40",
          description: "Sleep Disorders",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-41",
          description: "Smoking Cessation",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-42",
          description: "Substance Abuse",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-43",
          description: "Thyroid Disease",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-44",
          description: "Weight Loss",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB7-45",
          description: "Women’s Health",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB8",
          description: "Food & Drink",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB8-1",
          description: "American Cuisine",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB8-2",
          description: "Barbecues & Grilling",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB8-3",
          description: "Cajun/Creole",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB8-4",
          description: "Chinese Cuisine",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB8-5",
          description: "Cocktails/Beer",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB8-6",
          description: "Coffee/Tea",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB8-7",
          description: "Cuisine-Specific",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB8-8",
          description: "Desserts & Baking",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB8-9",
          description: "Dining Out",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB8-10",
          description: "Food Allergies",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB8-11",
          description: "French Cuisine",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB8-12",
          description: "Health/Lowfat Cooking",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB8-13",
          description: "Italian Cuisine",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB8-14",
          description: "Japanese Cuisine",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB8-15",
          description: "Mexican Cuisine",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB8-16",
          description: "Vegan",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB8-17",
          description: "Vegetarian",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB8-18",
          description: "Wine",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB9",
          description: "Hobbies & Interests",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB9-1",
          description: "Art/Technology",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB9-2",
          description: "Arts & Crafts",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB9-3",
          description: "Beadwork",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB9-4",
          description: "Birdwatching",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB9-5",
          description: "Board Games/Puzzles",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB9-6",
          description: "Candle & Soap Making",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB9-7",
          description: "Card Games",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB9-8",
          description: "Chess",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB9-9",
          description: "Cigars",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB9-10",
          description: "Collecting",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB9-11",
          description: "Comic Books",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB9-12",
          description: "Drawing/Sketching",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB9-13",
          description: "Freelance Writing",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB9-14",
          description: "Genealogy",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB9-15",
          description: "Getting Published",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB9-16",
          description: "Guitar",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB9-17",
          description: "Home Recording",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB9-18",
          description: "Investors & Patents",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB9-19",
          description: "Jewelry Making",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB9-20",
          description: "Magic & Illusion",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB9-21",
          description: "Needlework",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB9-22",
          description: "Painting",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB9-23",
          description: "Photography",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB9-24",
          description: "Radio",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB9-25",
          description: "Roleplaying Games",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB9-26",
          description: "Sci-Fi & Fantasy",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB9-27",
          description: "Scrapbooking",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB9-28",
          description: "Screenwriting",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB9-29",
          description: "Stamps & Coins",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB9-30",
          description: "Video & Computer Games",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB9-31",
          description: "Woodworking",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB10",
          description: "Home & Garden",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB10-1",
          description: "Appliances",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB10-2",
          description: "Entertaining",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB10-3",
          description: "Environmental Safety",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB10-4",
          description: "Gardening",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB10-5",
          description: "Home Repair",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB10-6",
          description: "Home Theater",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB10-7",
          description: "Interior Decorating",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB10-8",
          description: "Landscaping",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB10-9",
          description: "Remodeling & Construction",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB11",
          description: "Law, Gov’t & Politics",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB11-1",
          description: "Immigration",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB11-2",
          description: "Legal Issues",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB11-3",
          description: "U.S. Government Resources",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB11-4",
          description: "Politics",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB11-5",
          description: "Commentary",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB12",
          description: "News",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB12-1",
          description: "International News",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB12-2",
          description: "National News",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB12-3",
          description: "Local News",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB13",
          description: "Personal Finance",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB13-1",
          description: "Beginning Investing",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB13-2",
          description: "Credit/Debt & Loans",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB13-3",
          description: "Financial News",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB13-4",
          description: "Financial Planning",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB13-5",
          description: "Hedge Fund",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB13-6",
          description: "Insurance",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB13-7",
          description: "Investing",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB13-8",
          description: "Mutual Funds",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB13-9",
          description: "Options",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB13-10",
          description: "Retirement Planning",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB13-11",
          description: "Stocks",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB13-12",
          description: "Tax Planning",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB14",
          description: "Society",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB14-1",
          description: "Dating",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB14-2",
          description: "Divorce Support",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB14-3",
          description: "Gay Life",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB14-4",
          description: "Marriage",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB14-5",
          description: "Senior Living",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB14-6",
          description: "Teens",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB14-7",
          description: "Weddings",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB14-8",
          description: "Ethnic Specific",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB15",
          description: "Science",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB15-1",
          description: "Astrology",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB15-2",
          description: "Biology",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB15-3",
          description: "Chemistry",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB15-4",
          description: "Geology",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB15-5",
          description: "Paranormal Phenomena",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB15-6",
          description: "Physics",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB15-7",
          description: "Space/Astronomy",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB15-8",
          description: "Geography",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB15-9",
          description: "Botany",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB15-10",
          description: "Weather",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB16",
          description: "Pets",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB16-1",
          description: "Aquariums",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB16-2",
          description: "Birds",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB16-3",
          description: "Cats",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB16-4",
          description: "Dogs",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB16-5",
          description: "Large Animals",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB16-6",
          description: "Reptiles",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB16-7",
          description: "Veterinary Medicine",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17",
          description: "Sports",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-1",
          description: "Auto Racing",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-2",
          description: "Baseball",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-3",
          description: "Bicycling",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-4",
          description: "Bodybuilding",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-5",
          description: "Boxing",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-6",
          description: "Canoeing/Kayaking",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-7",
          description: "Cheerleading",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-8",
          description: "Climbing",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-9",
          description: "Cricket",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-10",
          description: "Figure Skating",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-11",
          description: "Fly Fishing",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-12",
          description: "Football",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-13",
          description: "Freshwater Fishing",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-14",
          description: "Game & Fish",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-15",
          description: "Golf",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-16",
          description: "Horse Racing",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-17",
          description: "Horses",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-18",
          description: "Hunting/Shooting",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-19",
          description: "Inline Skating",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-20",
          description: "Martial Arts",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-21",
          description: "Mountain Biking",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-22",
          description: "NASCAR Racing",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-23",
          description: "Olympics",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-24",
          description: "Paintball",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-25",
          description: "Power & Motorcycles",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-26",
          description: "Pro Basketball",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-27",
          description: "Pro Ice Hockey",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-28",
          description: "Rodeo",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-29",
          description: "Rugby",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-30",
          description: "Running/Jogging",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-31",
          description: "Sailing",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-32",
          description: "Saltwater Fishing",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-33",
          description: "Scuba Diving",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-34",
          description: "Skateboarding",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-35",
          description: "Skiing",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-36",
          description: "Snowboarding",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-37",
          description: "Surfing/Bodyboarding",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-38",
          description: "Swimming",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-39",
          description: "Table Tennis/Ping-Pong",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-40",
          description: "Tennis",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-41",
          description: "Volleyball",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-42",
          description: "Walking",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-43",
          description: "Waterski/Wakeboard",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB17-44",
          description: "World Soccer",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB18",
          description: "Style & Fashion",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB18-1",
          description: "Beauty",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB18-2",
          description: "Body Art",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB18-3",
          description: "Fashion",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB18-4",
          description: "Jewelry",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB18-5",
          description: "Clothing",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB18-6",
          description: "Accessories",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB19",
          description: "Technology & Computing",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB19-1",
          description: "3-D Graphics",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB19-2",
          description: "Animation",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB19-3",
          description: "Antivirus Software",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB19-4",
          description: "C/C++",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB19-5",
          description: "Cameras & Camcorders",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB19-6",
          description: "Cell Phones",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB19-7",
          description: "Computer Certification",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB19-8",
          description: "Computer Networking",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB19-9",
          description: "Computer Peripherals",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB19-10",
          description: "Computer Reviews",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB19-11",
          description: "Data Centers",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB19-12",
          description: "Databases",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB19-13",
          description: "Desktop Publishing",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB19-14",
          description: "Desktop Video",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB19-15",
          description: "Email",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB19-16",
          description: "Graphics Software",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB19-17",
          description: "Home Video/DVD",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB19-18",
          description: "Internet Technology",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB19-19",
          description: "Java",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB19-20",
          description: "JavaScript",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB19-21",
          description: "Mac Support",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB19-22",
          description: "MP3/MIDI",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB19-23",
          description: "Net Conferencing",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB19-24",
          description: "Net for Beginners",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB19-25",
          description: "Network Security",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB19-26",
          description: "Palmtops/PDAs",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB19-27",
          description: "PC Support",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB19-28",
          description: "Portable",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB19-29",
          description: "Entertainment",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB19-30",
          description: "Shareware/Freeware",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB19-31",
          description: "Unix",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB19-32",
          description: "Visual Basic",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB19-33",
          description: "Web Clip Art",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB19-34",
          description: "Web Design/HTML",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB19-35",
          description: "Web Search",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB19-36",
          description: "Windows",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB20",
          description: "Travel",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB20-1",
          description: "Adventure Travel",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB20-2",
          description: "Africa",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB20-3",
          description: "Air Travel",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB20-4",
          description: "Australia & New Zealand",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB20-5",
          description: "Bed & Breakfasts",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB20-6",
          description: "Budget Travel",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB20-7",
          description: "Business Travel",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB20-8",
          description: "By US Locale",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB20-9",
          description: "Camping",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB20-10",
          description: "Canada",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB20-11",
          description: "Caribbean",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB20-12",
          description: "Cruises",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB20-13",
          description: "Eastern Europe",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB20-14",
          description: "Europe",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB20-15",
          description: "France",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB20-16",
          description: "Greece",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB20-17",
          description: "Honeymoons/Getaways",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB20-18",
          description: "Hotels",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB20-19",
          description: "Italy",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB20-20",
          description: "Japan",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB20-21",
          description: "Mexico & Central America",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB20-22",
          description: "National Parks",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB20-23",
          description: "South America",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB20-24",
          description: "Spas",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB20-25",
          description: "Theme Parks",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB20-26",
          description: "Traveling with Kids",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB20-27",
          description: "United Kingdom",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB21",
          description: "Real Estate",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB21-1",
          description: "Apartments",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB21-2",
          description: "Architects",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB21-3",
          description: "Buying/Selling Homes",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB22",
          description: "Shopping",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB22-1",
          description: "Contests & Freebies",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB22-2",
          description: "Couponing",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB22-3",
          description: "Comparison",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB22-4",
          description: "Engines",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB23",
          description: "Religion & Spirituality",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB23-1",
          description: "Alternative Religions",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB23-2",
          description: "Atheism/Agnosticism",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB23-3",
          description: "Buddhism",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB23-4",
          description: "Catholicism",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB23-5",
          description: "Christianity",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB23-6",
          description: "Hinduism",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB23-7",
          description: "Islam",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB23-8",
          description: "Judaism",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB23-9",
          description: "Latter-Day Saints",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB23-10",
          description: "Pagan/Wiccan",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB24",
          description: "Uncategorized",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB25",
          description: "Non-Standard Content",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB25-1",
          description: "Unmoderated UGC",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB25-2",
          description: "Extreme Graphic/Explicit Violence",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB25-3",
          description: "Pornography",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB25-4",
          description: "Profane Content",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB25-5",
          description: "Hate Content",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB25-6",
          description: "Under Construction",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB25-7",
          description: "Incentivized",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB26",
          description: "Illegal Content",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB26-1",
          description: "Illegal Content",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB26-2",
          description: "Warez",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB26-3",
          description: "Spyware/Malware",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "IAB26-4",
          description: "Copyright Infringement",
          type: "segmentation",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
    } catch (e) {
      console.error(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`TRUNCATE TABLE "Tags" CASCADE;`);
    await queryInterface.sequelize.query(`TRUNCATE TABLE "OfferTags" CASCADE;`);
  }
};
