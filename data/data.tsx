import { FaUpwork, FaXTwitter } from "react-icons/fa6";
import { BsGithub, BsGlobe, BsLinkedin } from "react-icons/bs";
import { TfiEmail } from "react-icons/tfi";
import { SiGoogleforms } from "react-icons/si";
import Pomero from "@/public/pomero.png";
import Sticko from "@/public/sticko.png";
import Kuchbhi from "@/public/kuchbhi.png";
export const DATA = {
  socialButtons: [
    {
      link: "https://x.com/justtayyabkhxn",
      icon: FaXTwitter,
      message: "Twitter",
    },
    {
      link: "https://github.com/justtayyabkhxn",
      icon: BsGithub,
      message: "GitHub",
    },
    {
      link: "https://www.linkedin.com/in/justtayyabkhan/",
      icon: BsLinkedin,
      message: "LinkedIn",
    },
    {
      link: "mailto:tayyabkhangk4734@gmail.com",
      icon: TfiEmail,
      message: "Email",
    },
    // {
    //   link: "https://www.upwork.com/freelancers/~01f29bf792f063bb1b?mp_source=share",
    //   icon: FaUpwork,
    //   message: "Upwork",
    // },
    {
      link: "https://drive.google.com/file/d/1PYOr_whlft1kdsGrrmph-AqIlnSzDwaz/view?usp=sharing",
      icon: SiGoogleforms,
      message: "Resume",
    },
  ],
  skills: [
    "React",
    "Next.js",
    "Typescript",
    "Node.js",
    "Express",
    "MongoDb",
    // "Go",
    "Postgress",
    "Docker",
    // "Kafka",
    "C++",
    "Java",
    "Python",
    "Git",
    "Github",
    // "Redis",
    "Prisma",
    "Postman",
    "websockets",
  ],
  Projects: [
    {
      title: "MyBudgetory",
      dates: "May 2025",
      href: "https://mybudgetory.vercel.app/",
      active: true,
      description:
        "**Budgetory** is a personal finance web app designed to help users track their income and expenses. With features like transaction management, insightful statistics, and monthly expense analysis, Budgetory makes budgeting simple and efficient. The app is fully responsive, offering a seamless experience across devices. It’s built using Next.js, Tailwind CSS, Node.js, and MongoDB, ensuring a modern and scalable solution for managing finances.",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
        links: [
        {
          type: "Website",
          href: "https://mybudgetory.vercel.app/",
          icon: <BsGlobe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/justtayyabkhxn/mybudgetory/",
          icon: <BsGithub className="size-3" />,
        },
      ],
      image: "/mybudgetory.png",
      video: "",
    },
    {
      title: "TrackR",
      dates: "Aug-Oct 2024",
      active: true,
      description:
        "**TrackR** is a web-based platform for managing lost and found items, built with React, Node.js, Express, and MongoDB. It allows users to report lost belongings, list found items, and search posts by location. Key features include secure authentication, an admin dashboard for post moderation, and notifications for matches or updates. With its responsive design and community-driven approach, TrackR streamlines reconnecting people with their belongings efficiently.",
      technologies: ["Node.js", "React", "MongoDB", "Express"],
      links: [
        {
          type: "Source",
          href: "https://github.com/justtayyabkhxn/TrackR",
          icon: <BsGithub className="size-3" />,
        },
      ],
      image: "/trackit.png",
      video: "",
    },
    
    {
      title: "Sticko",
      href: "https://stickonotes.vercel.app/",
      active: true,
      description:
        "**Sticko** is a simple and intuitive web application designed to help users manage their notes and to-dos effectively. With features like easy task management, note-taking, and the ability to save and export your data, Sticko offers a clean interface built using Next.js, TypeScript, and Tailwind CSS. It is fully responsive, ensuring that you can stay organized and productive on any device.",
      technologies: [ "Next.js, TypeScript, Tailwind CSS, Node.js, Express, MongoDB",],
      links: [
        {
          type: "Website",
          href: "https://https://stickonotes.vercel.app/",
          icon: <BsGlobe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/justtayyabkhxn/sticko/",
          icon: <BsGithub className="size-3" />,
        },
      ],
      image: Sticko,
      video: "",
    },
    {
      title: "Pomero",
      href: "https://justtayyabkhxn.github.io/pomero/",
      active: true,
      description:
        "**Pomero** is a productivity app designed to help you stay focused and manage your time effectively using the Pomodoro technique. With a sleek interface, Pomero allows users to break their work into focused intervals, track progress, and optimize productivity. Key features include customizable timer settings, task management, progress reports, and soothing alerts to signal breaks. Whether you're studying, working, or pursuing personal projects, Pomero makes time management effortless and helps you achieve your goals with greater efficiency.",
      technologies: ["HTML", "CSS", "JavaScript"],
      links: [
        {
          type: "Website",
          href: "https://justtayyabkhxn.github.io/pomero/",
          icon: <BsGlobe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/justtayyabkhxn/pomero/",
          icon: <BsGithub className="size-3" />,
        },
      ],
      image: Pomero,
      video: "",
    },
    {
      title: "Instant QR Code Generator",
      href: "https://myqr-gen.vercel.app/",
      dates: "",
      active: true,
      description:
        "**QRGen** simplifies QR code creation with a user-friendly platform that allows instant generation and customization. Users can create QR codes for URLs, text, and other data types with ease. Featuring a secure login/signup system for personalized designs, QRGen also offers free, hassle-free generation without registration. With a sleek UI and seamless performance, it’s the ultimate tool for quick and efficient QR code generation.",
      technologies: ["Next.js", "TypeScript", "MongoDB","TailwindCSS,JWTs"],
      links: [
        {
          type: "Website",
          href: "https://myqr-gen.vercel.app/",
          icon: <BsGlobe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/justtayyabkhxn/myqr-gen",
          icon: <BsGithub className="size-3" />,
        },
      ],
      image: "/qr-gen.png",
      video: "",
    },
    {
      title: "Restaurant Landing Page",
      href: "https://justtayyabkhxn.github.io/kuchbhirestaurant",
      dates: "",
      active: true,
      description:
        "**KuchBhi Restaurant** revolutionizes dining with a seamless platform for browsing menus, customizing orders, and tracking real-time updates. Featuring secure payments, location-based services, and a feedback system, it ensures memorable meals and unmatched convenience, whether dining in or ordering online.",
      technologies: ["HTML", "CSS", "JavaScript"],
      links: [
        {
          type: "Website",
          href: "https://justtayyabkhxn.github.io/kuchbhirestaurant",
          icon: <BsGlobe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/justtayyabkhxn/kuchbhirestaurant",
          icon: <BsGithub className="size-3" />,
        },
      ],
      image: Kuchbhi,
      video: "",
    },
    {
      title: "My Portfolio",
      href: "https://justtayyabkhxn.github.io/portfolio/",
      dates: "",
      active: true,
      description:
        "**My Portfolio Website** showcases my skills, projects, and expertise in software development, featuring works like **TrackR** and the **Pomero App**. With a modern design and seamless navigation, it offers a glimpse into my technical abilities and professional journey.",
      technologies: ["HTML", "CSS", "JavaScript"],
      links: [
        {
          type: "Website",
          href: "https://justtayyabkhxn.github.io/portfolio/",
          icon: <BsGlobe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/justtayyabkhxn/portfolio",
          icon: <BsGithub className="size-3" />,
        },
      ],
      image: "/portfolio.png",
      video: "",
    },
    {
      title: "WhatsTheWeather",
      href: "https://justtayyabkhxn.github.io/whatstheweather/",
      dates: "",
      active: true,
      description:
        "**WhatsTheWeather** is a user-friendly app designed to provide accurate and real-time weather updates for any location. With detailed forecasts, current conditions, and location-based insights, it helps users stay prepared for the day ahead. The app features a clean interface, making it easy to check temperature, humidity, wind speed, and more. Whether you're planning your daily commute or an outdoor adventure, **WhatsTheWeather** ensures you're always informed and ready for changing conditions.",
      technologies: [
        "HTML",
       "CSS",
       "JavaScript", 
      ],
      links: [
        {
          type: "Website",
          href: "https://justtayyabkhxn.github.io/whatstheweather",
          icon: <BsGlobe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/justtayyabkhxn/whatstheweather",
          icon: <BsGithub className="size-3" />,
        },
      ],
      image: "/weather.png",
      video: "",
    },
    {
      title: "Plate-Picker",
      href: "https://justtayyabkhxn.github.io/plate-picker",
      dates: "",
      active: true,
      description:
        "**PlatePicker** is a smart food recommendation app designed to simplify meal choices. It tailors suggestions based on your preferences, cravings, and dietary needs, offering a personalized dining experience. With a user-friendly interface, PlatePicker helps you discover new dishes, explore diverse cuisines, and make quick decisions whether you're dining out or cooking at home. Perfect for food enthusiasts and indecisive eaters alike, PlatePicker turns every meal into a delightful adventure.",
      technologies: ["HTML", "CSS", "JavaScript"],
      links: [
        {
          type: "Website",
          href: "https://justtayyabkhxn.github.io/plate-picker",
          icon: <BsGlobe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/justtayyabkhxn/plate-picker",
          icon: <BsGithub className="size-3" />,
        },
      ],
      image: "/platepicker.png",
      video: "",
    },
  ],
  education: [
    {
      school: "Aligarh Muslim University",
      href: "https://www.amu.ac.in/",
      degree: "Master in Computer Applications",
      location: "Aligarh, UP",
      logoUrl: "/amu.png",
      start: "2023",
      end: "2025",
    },
    {
      school: "Aligarh Muslim University",
      href: "https://www.amu.ac.in/",
      degree: "Bachelors in Science(Physics)",
      location: "Aligarh, UP",
      logoUrl: "/amu.png",
      start: "2020",
      end: "2023",
    },
  ],
};
