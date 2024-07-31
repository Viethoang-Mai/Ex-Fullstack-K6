import SignInForm from "@/components/SignInForm";
import Header from "../components/Header";

export default function HomePage() {
    return (
        <>
            <SignInForm />
            <div className="container mx-auto">
                <Header />
                <main>
                    <h1 className="text-3xl font-bold text-center mb-8">
                        Homepage
                    </h1>
                </main>
            </div>
        </>
    );
}
