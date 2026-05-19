// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { cn } from "@/lib/utils";
// import { Menu, X } from "lucide-react"; // Icons for mobile menu
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   navigationMenuTriggerStyle,
// } from "@/components/ui/navigation-menu";
// import {
//   Sheet,
//   SheetContent,
//   SheetTrigger,
//   SheetClose,
//   SheetHeader,
//   SheetTitle,
// } from "@/components/ui/sheet";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Button } from "@/components/ui/button";

// const resources = [
//   {
//     title: "Events",
//     href: "/events",
//     description: "Workshops, hackathons, and upcoming bootcamps.",
//   },
//   {
//     title: "Gallery",
//     href: "/gallery",
//     description: "Life at Azentra: Photos of our team and culture.",
//   },
//   {
//     title: "Newsletter",
//     href: "/newsletter",
//     description: "Weekly tech insights and industry news.",
//   },
// ];

// export function Navbar() {
//   return (
//     <div className="w-full border-b bg-background relative z-50">
//       <div className="container mx-auto flex h-16 items-center justify-between px-4">
//         {/* LOGO */}
//         <div className="font-bold text-xl tracking-tight mr-8">
//           <Link to="/">Azentra Global</Link>
//         </div>

//         {/* === DESKTOP MENU (Hidden on Mobile) === */}
//         <div className="hidden md:flex flex-1 justify-center">
//           <NavigationMenu>
//             <NavigationMenuList>
//               <NavigationMenuItem>
//                 <NavigationMenuLink
//                   asChild
//                   className={navigationMenuTriggerStyle()}
//                 >
//                   <Link to="/">Home</Link>
//                 </NavigationMenuLink>
//               </NavigationMenuItem>

//               <NavigationMenuItem>
//                 <NavigationMenuLink
//                   asChild
//                   className={navigationMenuTriggerStyle()}
//                 >
//                   <Link to="/about">About Us</Link>
//                 </NavigationMenuLink>
//               </NavigationMenuItem>

//               <NavigationMenuItem>
//                 <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>
//                   Hosting
//                 </NavigationMenuTrigger>
//                 <NavigationMenuContent>
//                   <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
//                     <li className="row-span-3">
//                       <NavigationMenuLink asChild>
//                         <a
//                           className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
//                           href="/hosting/business"
//                         >
//                           <div className="mb-2 mt-4 text-lg font-medium">
//                             cPanel Hosting
//                           </div>
//                           <p className="text-sm leading-tight text-muted-foreground">
//                             Reliable web hosting with cPanel control panel for
//                             businesses and students.
//                           </p>
//                         </a>
//                       </NavigationMenuLink>
//                     </li>
//                     <ListItem href="/hosting/business" title="Business Hosting">
//                       Professional hosting solutions for businesses with high
//                       performance and reliability.
//                     </ListItem>
//                     <ListItem href="/hosting/student" title="Academic Hosting">
//                       Affordable hosting plans designed for students and
//                       beginners.
//                     </ListItem>
//                   </ul>
//                 </NavigationMenuContent>
//               </NavigationMenuItem>

//               <NavigationMenuItem>
//                 <NavigationMenuLink
//                   asChild
//                   className={navigationMenuTriggerStyle()}
//                 >
//                   <Link to="/Services">Services</Link>
//                 </NavigationMenuLink>
//               </NavigationMenuItem>

//               <NavigationMenuItem>
//                 <NavigationMenuLink
//                   asChild
//                   className={navigationMenuTriggerStyle()}
//                 >
//                   <Link to="/internship">Internships</Link>
//                 </NavigationMenuLink>
//               </NavigationMenuItem>

//               <NavigationMenuItem>
//                 <NavigationMenuLink
//                   asChild
//                   className={navigationMenuTriggerStyle()}
//                 >
//                   <Link to="/careers">Careers</Link>
//                 </NavigationMenuLink>
//               </NavigationMenuItem>

//               <NavigationMenuItem>
//                 <NavigationMenuLink
//                   asChild
//                   className={navigationMenuTriggerStyle()}
//                 >
//                   <Link to="/contact">Contact</Link>
//                 </NavigationMenuLink>
//               </NavigationMenuItem>
//             </NavigationMenuList>
//           </NavigationMenu>
//         </div>

//         {/* === MOBILE MENU (Visible ONLY on Mobile) === */}
//         <div className="md:hidden ml-auto">
//           <Sheet>
//             <SheetTrigger asChild>
//               <Button variant="ghost" size="icon">
//                 <Menu className="h-6 w-6" />
//                 <span className="sr-only">Toggle menu</span>
//               </Button>
//             </SheetTrigger>

//             <SheetContent side="right" className="w-[300px] sm:w-[400px]">
//               <SheetHeader>
//                 <SheetTitle className="text-left font-bold text-xl">
//                   Azentra Global
//                 </SheetTitle>
//               </SheetHeader>

//               <div className="flex flex-col gap-4 mt-8">
//                 {/* Regular Links need SheetClose so the menu closes when clicked */}
//                 <SheetClose asChild>
//                   <Link
//                     to="/"
//                     className="text-lg font-medium hover:text-primary"
//                   >
//                     Home
//                   </Link>
//                 </SheetClose>
//                 <SheetClose asChild>
//                   <Link
//                     to="/about"
//                     className="text-lg font-medium hover:text-primary"
//                   >
//                     About Us
//                   </Link>
//                 </SheetClose>
// <Accordion type="single" collapsible className="w-full">
//   <AccordionItem value="hosting">
//     <AccordionTrigger className="text-lg font-medium">
//       Hosting
//     </AccordionTrigger>

//     <AccordionContent className="flex flex-col gap-3 pl-4">

//       <SheetClose asChild>
//         <Link
//           to="/hosting/business"
//           className="text-md font-medium hover:text-primary"
//         >
//           Commercial Hosting
//         </Link>
//       </SheetClose>

//       <SheetClose asChild>
//         <Link
//           to="/hosting/student"
//           className="text-md font-medium hover:text-primary"
//         >
//           Academic Hosting
//         </Link>
//       </SheetClose>

//     </AccordionContent>
//   </AccordionItem>
// </Accordion>
//                 <SheetClose asChild>
//                   <Link
//                     to="/services"
//                     className="text-lg font-medium hover:text-primary"
//                   >
//                     Services
//                   </Link>
//                 </SheetClose>
//                 <SheetClose asChild>
//                   <Link
//                     to="/internship"
//                     className="text-lg font-medium hover:text-primary"
//                   >
//                     Internships
//                   </Link>
//                 </SheetClose>
//                 <SheetClose asChild>
//                   <Link
//                     to="/careers"
//                     className="text-lg font-medium hover:text-primary"
//                   >
//                     Careers
//                   </Link>
//                 </SheetClose>
//                 <SheetClose asChild>
//                   <Link
//                     to="/contact"
//                     className="text-lg font-medium hover:text-primary"
//                   >
//                     Contact
//                   </Link>
//                 </SheetClose>
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Helper Component for Desktop Dropdowns
// const ListItem = React.forwardRef<
//   React.ElementRef<"a">,
//   React.ComponentPropsWithoutRef<"a">
// >(({ className, title, children, href, ...props }, ref) => {
//   return (
//     <li>
//       <NavigationMenuLink asChild>
//         <Link
//           ref={ref as any}
//           to={href || "#"}
//           className={cn(
//             "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
//             className,
//           )}
//           {...props}
//         >
//           <div className="text-sm font-medium leading-none">{title}</div>
//           <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//             {children}
//           </p>
//         </Link>
//       </NavigationMenuLink>
//     </li>
//   );
// });
// ListItem.displayName = "ListItem";

// export default Navbar;

import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <div className="w-full border-b bg-background relative z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* LOGO */}
        <div className="font-bold text-xl tracking-tight mr-8">
          <Link to="/" className="flex items-center gap-2">
          <img 
            src="/logo.png"  // <-- Just use the direct path from the public folder
            alt="Azentra Global Logo" 
            className="h-10 w-10 rounded-lg object-contain" 
          />
          <span className="text-xl font-bold text-foreground tracking-tight">
            Azentra Global
          </span>
        </Link>
        </div>

        {/* ================= DESKTOP MENU ================= */}
        <div className="hidden tablet-lg:flex flex-1 justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link to="/">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link to="/about">About Us</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* HOSTING DROPDOWN */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>
                  Web Hosting
                </NavigationMenuTrigger>

                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px]">
                    <ListItem
                      href="/hosting/business"
                      title="Commercial Web Hosting"
                    >
                      Professional hosting solutions designed for businesses
                      with performance and reliability.
                    </ListItem>

                    <ListItem
                      href="/hosting/student"
                      title="Academic Web Hosting"
                    >
                      Affordable hosting plans designed for students, learners,
                      and beginners.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link to="/services">Services</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* EVENTS DROPDOWN */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>
                  Events
                </NavigationMenuTrigger>

                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px]">
                    <ListItem
                      href="/events"
                      title="Events"
                    >
                      Workshops, hackathons, and upcoming bootcamps.
                    </ListItem>

                    <ListItem
                      href="/workshop"
                      title="Workshop"
                    >
                      Hands-on training sessions and skill development programs.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* INITIATIVES DROPDOWN */}
              {/* <NavigationMenuItem>
                <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>
                  Initiatives
                </NavigationMenuTrigger>

                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[500px] lg:grid-cols-2">
                    <ListItem
                      href="/initiatives/ccp"
                      title="CCP"
                    >
                      Community Connect Program
                    </ListItem>

                    <ListItem
                      href="/initiatives/ceip"
                      title="CEIP"
                    >
                      Career Enhancement Internship Program
                    </ListItem>

                    <ListItem
                      href="/skill-advancement-internship-program"
                      title="SAIP"
                    >
                      Skill Advancement Internship Program
                    </ListItem>

                    <ListItem
                      href="/initiatives/digital-marketing"
                      title="Digital Marketing"
                    >
                      Digital Marketing Initiative
                    </ListItem>

                    <ListItem
                      href="/initiatives/software-development"
                      title="Software Development"
                    >
                      Software Development Programs
                    </ListItem>

                    <ListItem
                      href="/initiatives/devops"
                      title="DevOps"
                    >
                      DevOps Training and Certification
                    </ListItem>

                    <ListItem
                      href="/initiatives/web-hosting"
                      title="Web Hosting"
                    >
                      Web Hosting Solutions and Services
                    </ListItem>

                    <ListItem
                      href="/initiatives/achiever-way"
                      title="Achiever Way"
                    >
                      Achiever Way Program
                    </ListItem>

                    <ListItem
                      href="/initiatives/global-minds-club"
                      title="Global Minds Club"
                    >
                      Global Minds Club Initiative
                    </ListItem>

                    <ListItem
                      href="/initiatives/grow-green-initiative"
                      title="Grow Green Initiative"
                    >
                      Environmental Sustainability Program
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem> */}

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link to="/internship">Internships</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link to="/careers">Careers</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link to="/consultancy">Consultancy</Link>
                </NavigationMenuLink>
              </NavigationMenuItem> */}

              {/* <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link to="/portal">Portal</Link>
                </NavigationMenuLink>
              </NavigationMenuItem> */}

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link to="/contact">Contact</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* ================= MOBILE MENU ================= */}
        <div className="tablet-lg:hidden ml-auto">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[300px]">
              <SheetHeader>
                <SheetTitle className="text-left font-bold text-xl">
                  Azentra Global
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-4 mt-8">
                <SheetClose asChild>
                  <Link
                    to="/"
                    className="text-lg font-medium hover:text-primary"
                  >
                    Home
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link
                    to="/about"
                    className="text-lg font-medium hover:text-primary"
                  >
                    About Us
                  </Link>
                </SheetClose>

                {/* HOSTING MOBILE DROPDOWN */}
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="hosting">
                    <AccordionTrigger className="text-lg font-medium">
                      Web Hosting
                    </AccordionTrigger>

                    <AccordionContent className="flex flex-col gap-3 pl-4">
                      <SheetClose asChild>
                        <Link
                          to="/hosting/business"
                          className="text-md hover:text-primary"
                        >
                          Commercial Web Hosting
                        </Link>
                      </SheetClose>

                      <SheetClose asChild>
                        <Link
                          to="/hosting/student"
                          className="text-md hover:text-primary"
                        >
                          Academic Web Hosting
                        </Link>
                      </SheetClose>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <SheetClose asChild>
                  <Link
                    to="/services"
                    className="text-lg font-medium hover:text-primary"
                  >
                    Services
                  </Link>
                </SheetClose>

                {/* EVENTS MOBILE DROPDOWN */}
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="events">
                    <AccordionTrigger className="text-lg font-medium">
                      Events
                    </AccordionTrigger>

                    <AccordionContent className="flex flex-col gap-3 pl-4">
                      <SheetClose asChild>
                        <Link
                          to="/events"
                          className="text-md hover:text-primary"
                        >
                          Events
                        </Link>
                      </SheetClose>

                      <SheetClose asChild>
                        <Link
                          to="/workshop"
                          className="text-md hover:text-primary"
                        >
                          Workshop
                        </Link>
                      </SheetClose>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* INITIATIVES MOBILE DROPDOWN */}
                {/* <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="initiatives">
                    <AccordionTrigger className="text-lg font-medium">
                      Initiatives
                    </AccordionTrigger>

                    <AccordionContent className="flex flex-col gap-3 pl-4">
                      <SheetClose asChild>
                        <Link
                          to="/initiatives/ccp"
                          className="text-md hover:text-primary"
                        >
                          CCP
                        </Link>
                      </SheetClose>

                      <SheetClose asChild>
                        <Link
                          to="/initiatives/ceip"
                          className="text-md hover:text-primary"
                        >
                          CEIP
                        </Link>
                      </SheetClose>

                      <SheetClose asChild>
                        <Link
                          to="/skill-advancement-internship-program"
                          className="text-md hover:text-primary"
                        >
                          SAIP
                        </Link>
                      </SheetClose>

                      <SheetClose asChild>
                        <Link
                          to="/initiatives/digital-marketing"
                          className="text-md hover:text-primary"
                        >
                          Digital Marketing
                        </Link>
                      </SheetClose>

                      <SheetClose asChild>
                        <Link
                          to="/initiatives/software-development"
                          className="text-md hover:text-primary"
                        >
                          Software Development
                        </Link>
                      </SheetClose>

                      <SheetClose asChild>
                        <Link
                          to="/initiatives/devops"
                          className="text-md hover:text-primary"
                        >
                          DevOps
                        </Link>
                      </SheetClose>

                      <SheetClose asChild>
                        <Link
                          to="/initiatives/web-hosting"
                          className="text-md hover:text-primary"
                        >
                          Web Hosting
                        </Link>
                      </SheetClose>

                      <SheetClose asChild>
                        <Link
                          to="/initiatives/achiever-way"
                          className="text-md hover:text-primary"
                        >
                          Achiever Way
                        </Link>
                      </SheetClose>

                      <SheetClose asChild>
                        <Link
                          to="/initiatives/global-minds-club"
                          className="text-md hover:text-primary"
                        >
                          Global Minds Club
                        </Link>
                      </SheetClose>

                      <SheetClose asChild>
                        <Link
                          to="/initiatives/grow-green-initiative"
                          className="text-md hover:text-primary"
                        >
                          Grow Green Initiative
                        </Link>
                      </SheetClose>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion> */}

                <SheetClose asChild>
                  <Link
                    to="/internship"
                    className="text-lg font-medium hover:text-primary"
                  >
                    Internships
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link
                    to="/careers"
                    className="text-lg font-medium hover:text-primary"
                  >
                    Careers
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link
                    to="/consultancy"
                    className="text-lg font-medium hover:text-primary"
                  >
                    Consultancy
                  </Link>
                </SheetClose>

                {/* <SheetClose asChild>
                  <Link
                    to="/portal"
                    className="text-lg font-medium hover:text-primary"
                  >
                    Portal
                  </Link>
                </SheetClose> */}

                <SheetClose asChild>
                  <Link
                    to="/contact"
                    className="text-lg font-medium hover:text-primary"
                  >
                    Contact
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}

/* ================= HELPER COMPONENT ================= */

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref as any}
          to={href || "#"}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-sm text-muted-foreground">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";

export default Navbar;
