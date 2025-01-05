import { FC } from "react";
import { handleSignIn, handleSignOut } from "./server-actions";

interface AuthButtonProps {
    status: boolean | null
    handleToggleStatus: () => void
  }
  
const AuthButton: FC<AuthButtonProps> = ({status, handleToggleStatus}) => {
    return (
      <>
      {status ? (
        <div>
            <button
              onClick={() => { handleSignOut(); handleToggleStatus(); }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Sign out
            </button>
        </div>
        ) : (
          <div>
            <button
              onClick={() => {handleSignIn(); handleToggleStatus();}}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Sign in
            </button>
          </div>
      )}
      </>
    )
}

export default AuthButton