import { Link } from "react-router-dom";
import { Cpu, Table, Binary, ArrowRight, Zap, BookOpen, GraduationCap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";

const tools = [
    {
        title: "Logic Gate Simulator",
        description: "Interactively explore AND, OR, NOT, NAND, NOR, and XOR gates with visual diagrams",
        icon: Cpu,
        path: "/logic-gates",
        color: "text-[hsl(var(--gate-and))]",
    },
    {
        title: "Truth Table Generator",
        description: "Auto-generate complete truth tables for any logic gate",
        icon: Table,
        path: "/truth-table",
        color: "text-[hsl(var(--gate-or))]",
    },
    {
        title: "Number Converter",
        description: "Convert between Binary, Decimal, and Hexadecimal instantly",
        icon: Binary,
        path: "/converter",
        color: "text-[hsl(var(--gate-not))]",
    },
];

const features = [
    {
        icon: Zap,
        title: "Instant Results",
        description: "See outputs change in real-time as you toggle inputs",
    },
    {
        icon: BookOpen,
        title: "Visual Learning",
        description: "Interactive gate diagrams help you understand circuit behavior",
    },
    {
        icon: GraduationCap,
        title: "Exam Ready",
        description: "Perfect for lab practice, viva preparation, and self-study",
    },
];

const Home = () => {
    return (
        <Layout>
            {/* Hero Section */}
            <section className="py-12 text-center">
                <div className="mx-auto max-w-3xl">
                    <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                        Digital Logic{" "}
                        <span className="text-primary">Learning Lab</span>
                    </h1>
                    <p className="mb-8 text-lg text-muted-foreground">
                        An interactive web app for ENTC students to master digital electronics concepts.
                        Explore logic gates, generate truth tables, and convert number systems — all in one place.
                    </p>
                </div>
            </section>

            {/* Tools Grid */}
            <section className="py-8">
                <h2 className="mb-6 text-center text-2xl font-semibold text-foreground">
                    Choose a Tool
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {tools.map((tool) => {
                        const Icon = tool.icon;
                        return (
                            <Link key={tool.path} to={tool.path}>
                                <Card className="group h-full cursor-pointer transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/10">
                                    <CardHeader>
                                        <div className={`mb-2 inline-flex rounded-lg bg-secondary p-3 ${tool.color}`}>
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <CardTitle className="flex items-center justify-between text-foreground">
                                            {tool.title}
                                            <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                                        </CardTitle>
                                        <CardDescription>{tool.description}</CardDescription>
                                    </CardHeader>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* Features Section */}
            <section className="py-12">
                <h2 className="mb-8 text-center text-2xl font-semibold text-foreground">
                    Why Use This App?
                </h2>
                <div className="grid gap-6 sm:grid-cols-3">
                    {features.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <Card key={feature.title} className="text-center">
                                <CardContent className="pt-6">
                                    <div className="mx-auto mb-4 inline-flex rounded-full bg-primary/10 p-3">
                                        <Icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="mb-2 font-semibold text-foreground">{feature.title}</h3>
                                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </section>

            {/* Target Audience */}
            <section className="py-8">
                <Card className="border-primary/20 bg-card">
                    <CardContent className="py-6 text-center">
                        <p className="text-muted-foreground">
                            Built for <span className="font-medium text-foreground">Electronics & Telecommunication (ENTC)</span> students
                            learning Digital Electronics. Perfect for lab sessions, exam preparation, and self-paced learning.
                        </p>
                    </CardContent>
                </Card>
            </section>
        </Layout>
    );
};

export default Home;
