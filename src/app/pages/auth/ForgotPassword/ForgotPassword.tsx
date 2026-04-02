import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import s from "./styles.module.css";
import { auth } from "../../../../lib/firebase";

function ForgotPassword() {
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage("");
        setError("");
        setLoading(true);

        try {
            await sendPasswordResetEmail(auth, email);
            setMessage("Password reset email sent! Check your inbox.");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={s.forgotPassword}>
            <div className={s.card}>
                <h2>Forgot Password</h2>

                <form onSubmit={handleReset}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>

                {message && <p className={s.success}>{message}</p>}
                {error && <p className={s.error}>{error}</p>}
            </div>
        </div>
    );
}

export default ForgotPassword;