"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link"; // Import Link from Next.js
import { useRouter } from "next/navigation";

function HomePage() {
  const Links = [
    { name: "HOME", link: "/" },
    { name: "DASHBOARD", link: "/admin/dashboard" },
    { name: "LOGIN", link: "/auth/login" },
    { name: "REGISTER", link: "/auth/register" }
  ];

  const data = [
    {
      category: "Profile",
      items: [
        { name: "About College", link: "https://www.rajalakshmi.org/profile-college.php" },
        { name: "Accreditations", link: "https://www.rajalakshmi.org/profile-accreditations.php" },
        { name: "Certifications", link: "https://www.rajalakshmi.org/profile-certifications.php" },
        { name: "Governing Council", link:"https://www.rajalakshmi.org/profile-govrn-council.php" },
        { name: "Development Council", link: "https://www.rajalakshmi.org/profile-dev-council.php"},
        { name: "MoU", link: "https://www.rajalakshmi.org/profile-mou.php" },
        { name: "Eminent Faculty", link: "https://www.rajalakshmi.org/profile-faculty.php" }
      ]
    },
    {
      category: "Academic",
      items: [
        { name: "Departments", link: "https://www.rajalakshmi.org/admission-courses.php" },
        { name: "Admissions", link: "https://www.rajalakshmi.org/admission-eligibility.php" },
        { name: "Facilities", link: "https://www.rajalakshmi.org/facilities-admin.php" },
        { name: "Student Life", link: "https://www.rajalakshmi.org/studentlife-student-services.php" },
        { name: "Research", link: "https://www.rajalakshmi.org/research.php" },
        { name: "Alumni", link: "https://www.rajalakshmi.org/alumni-meet.php" },
        { name: "Curriculum Feedback", link: "/curriculum-feedback" }
      ]
    }
  ];

  const words = ["Innovate", "Explore", "Learn", "Grow", "Succeed"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const pieces = document.querySelectorAll(".piece");
    setTimeout(() => {
      pieces.forEach((piece) => piece.classList.add("animate"));
    }, 1000);

    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleClick = () => {
    router.push("/dashboard");
  };

  return (
    <div className="bg-purple-100 p-6 min-h-screen flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <img
          src="./logo2.png"
          alt="College Logo"
          className="h-20 transform transition-transform duration-500 ease-in-out hover:scale-110 bright"
        />
        <nav>
          <ul className="flex space-x-6">
            {Links.map((link) => (
              <li key={link.name} className="relative text-xl">
                <Link href={link.link} className="nav-link">
                  {link.name}
                  <span className="underline-transition"></span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="relative max-w-7xl h-96 overflow-hidden flex mb-8">
        <div className="relative w-1/2 h-full flex flex-wrap">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className={"piece absolute w-full h-full bg-left bg-cover"}
              style={{
                backgroundImage: "url(/rec2.jpg)",
                backgroundPosition: `${(i % 5) * 20}% ${Math.floor(i / 5) * 20}%`,
              }}
            ></div>
          ))}
        </div>
        <div className="h-full leading-normal flex flex-col justify-start place-items-center p-8 mb-9">
          <h1 className="text-5xl font-bold mb-4 text-purple-500 leading-normal">
            Welcome To <span className="text-6xl text-purple-600">REC</span>
          </h1>
          <p className="text-2xl text-gray-700 mb-4"> " The World Needs You... "</p>
          <p className="text-2xl text-gray-700 mb-4"> "Because The World Needs You... "</p>
          <p className="text-6xl font-semibold font-mono text-purple-800">{words[currentWordIndex]}</p>
        </div>
      </div>
      <div className="mb-8">
        <p className="text-xl font-serif">
          Rajalakshmi Engineering College, an autonomous institution affiliated with Anna University, Chennai, was established in the year 1997 under the aegis of Rajalakshmi Educational Trust, whose members have had consummate experience in the fields of education and industry. The College has grown from strength to strength in the last 25 years and is progressing towards Excellence in Engineering Education, Research, and Development.
        </p>
      </div>
      <div className="flex items-start space-x-4">
        <div className="relative max-w-xs cursor-pointer overflow-hidden rounded-2xl shadow-lg group" onClick={handleClick}>
          <img src="./das.png" alt="dashboard" className="transition-transform group-hover:scale-110 duration-200" />
          <div className="absolute inset-0 flex flex-col justify-between p-4">
            <h2 className="text-2xl font-bold text-purple-500 mb-2">DASHBOARD</h2>
            <p className="text-xl text-purple-800">Faculty Achievements Analysis</p>
          </div>
        </div>
        <div className="flex-1 text-lg p-4 ">
          <h2 className="text-2xl text-purple-800 font-bold">Faculty Achievements Dashboard</h2>
          <p>
            Our Faculty Achievements Dashboard is a comprehensive platform showcasing the exceptional contributions and accomplishments of the esteemed faculty members at Rajalakshmi Engineering College. The dashboard provides insights into the diverse academic and professional achievements of our faculty, highlighting their dedication to excellence in teaching, research, and innovation.
          </p>
          <h2 className="text-2xl text-purple-800 font-bold">Showcasing Excellence in Education</h2>
          <p>
            With our intuitive and user-friendly interface, users can easily explore and analyze the data on faculty achievements. The dashboard offers a range of interactive visualizations, allowing users to filter and sort information by department, year, type of achievement, and more. This powerful tool enables stakeholders to gain valuable insights into the contributions of our faculty and the impact of their work.
          </p>
          <h2 className="text-2xl text-purple-800 font-bold">Explore, Discover, and Celebrate</h2>
          <p>We invite you to explore the Faculty Achievements Dashboard and discover the incredible work being done by our talented faculty members. Join us in celebrating their successes and contributions to the field of engineering and beyond. Together, we are building a brighter future through education, research, and innovation.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 mt-12 text-purple-950 bg-purple-400 w-full">
        {data.map((category, index) => (
          <div key={index}>
            <h2 className="text-lg font-semibold mb-4">{category.category}</h2>
            <ul>
              {category.items.map((item, index) => (
                <li key={index}>
                  <Link href={item.link} className="hover:text-gray-300">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          <p>Rajalakshmi Engineering College,<br />
            Rajalakshmi Nagar Thandalam,<br />
            Chennai, Tamil Nadu - 602105<br />
            044-37181818
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
