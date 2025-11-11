import { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import loginImg from "../loginImg.png";
import "../styles/login.css";

export function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault();
    // Placeholder register handler
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-card__media">
          <img
            src={loginImg}
            alt="Register background"
            className="register-card__image"
          />
        </div>

        <div className="register-card__form">
          <div className="register-form">
            <div className="register-form__heading">
              <h1>Register your account</h1>
              <p>
                Already have an account? <a href="/login">Log in</a>
              </p>
            </div>

            <form onSubmit={handleRegister} className="register-form__body">
              <div className="register-field">
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="register-input"
                />
              </div>

              <div className="register-field" style={{ position: 'relative' }}>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="register-input"
                  style={{ paddingRight: '3.5rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', padding: '0.5rem', cursor: 'pointer', background: 'transparent', border: 'none', color: 'white' }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              <div className="register-field" style={{ position: 'relative' }}>
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="register-input"
                  style={{ paddingRight: '3.5rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', padding: '0.5rem', cursor: 'pointer', background: 'transparent', border: 'none', color: 'white' }}
                  aria-label={
                    showConfirmPassword ? "Hide password confirmation" : "Show password confirmation"
                  }
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              <div className="register-terms">
                <Checkbox
                  id="terms"
                  checked={agreeToTerms}
                  onCheckedChange={(checked: boolean | "indeterminate") =>
                    setAgreeToTerms(checked === true)
                  }
                  className="register-checkbox"
                />
                <Label htmlFor="terms">
                  I agree to the <a href="#">Terms & Conditions</a>
                </Label>
              </div>

              <Button type="submit" className="register-primary-button">
                Register
              </Button>

              {/* <div className="register-divider">
                <span>Or register with</span>
              </div>

              <div className="register-socials">
                <Button type="button" variant="outline" className="register-social-button">
                  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button type="button" variant="outline" className="register-social-button">
                  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l-.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  Apple
                </Button>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
