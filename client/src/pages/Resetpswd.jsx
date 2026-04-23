import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useVerifyTokenQuery, useResetPasswordMutation } from '../features/auth/authApi';
import { toast } from 'react-toastify';

const Resetpswd = () => {
    const [searchp] = useSearchParams();
    const token = searchp.get("token");
    console.log(token);
    const { data } = useVerifyTokenQuery(token);
    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const [pswd, setPswd] = useState("");
    const navigate = useNavigate();
    const pd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    console.log("h", data);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!pd.test(pswd)) {
              toast.error("Password does not meet requirements");
              return;
            }
        try {
             
            await resetPassword({ password: pswd, user_id: data?.user_id });
            toast.success("Password updated!");
            navigate('/login');

        }
        catch (error) {
            toast.error(error?.data?.message || "Something went wrong");
        }
    }
    return (
        <>

            <div className="container d-flex justify-content-center align-items-center flex-column" style={{ minHeight: "80vh" }}>
                <h5 className="text-center mb-3">Please enter your new password</h5>
                <div className="p-4 border rounded-3 shadow" style={{ width: "350px", background: "#fff" }}>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Password:</label>
                            <input
                                className="form-control"
                                type="password" onChange={(e) => setPswd(e.target.value)}
                                placeholder="Enter password"
                                required
                            />
                            {
                  pswd&& !pd.test(pswd) && (
                    <p className="text-danger">
                      password must have atleast one uppercase,
                      lowercase, number and special symbol with minimum length 8
                    </p>
                  )
                }

                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100" disabled={isLoading}
                        >{isLoading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status"></span>

                            </>
                        ) : (
                            "Reset Password"
                        )}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Resetpswd;
