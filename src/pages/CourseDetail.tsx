import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Award, Users, Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { courses } from "@/data/courses";

const CourseDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const course = courses.find(c => c.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <Link to="/" className="text-primary hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                {course.category}
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{course.rating}</span>
                <span className="text-sm text-muted-foreground">({course.students} students)</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {course.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-6">
              {course.desc}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span className="font-medium">{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                <span className="font-medium">Certificate</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="font-medium">Live Classes</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-primary">{course.price}</span>
              <Button size="lg" className="px-8">
                Enroll Now
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* About */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold mb-6">About This Course</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {course.detailedDesc}
              </p>
            </motion.section>

            {/* What You'll Learn */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-6">What You'll Learn</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {course.features?.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Syllabus */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-6">Course Syllabus</h2>
              <Accordion type="single" collapsible className="w-full">
                {course.syllabus?.map((item, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                          {i + 1}
                        </div>
                        <span className="font-medium">{item.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="ml-12 mt-4">
                        <h4 className="font-semibold mb-3">Skills you'll learn:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {item.skills.map((skill, j) => (
                            <div key={j} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-success" />
                              <span className="text-sm text-muted-foreground">{skill}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card border border-border rounded-2xl p-6 sticky top-6"
            >
              <h3 className="text-lg font-bold mb-4">Course Includes</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span className="text-sm">{course.duration} of content</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span className="text-sm">Live interactive sessions</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span className="text-sm">Hands-on projects</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span className="text-sm">Certificate of completion</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span className="text-sm">Lifetime access</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span className="text-sm">Placement assistance</span>
                </li>
              </ul>
              
              <Button className="w-full mt-6" size="lg">
                Enroll Now  
                {/* {course.price} */}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;