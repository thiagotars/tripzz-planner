import { createPortal } from "react-dom";

const LoginModal = ({ isOpen, onClose, changeModal, onLogin }) => {
  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className="fixed top-[50%] left-[50%] transform translate-y-[-50%] translate-x-[-50%] w-screen h-screen bg-black/10 backdrop-blur-md">
      <button
        className="text-black fixed top-[21%] left-[50%] transform translate-y-[-50%] translate-x-[-50%] z-50 text-[.875em]"
        onClick={onClose}
      >
        X
      </button>
      <div className="fixed flex flex-col justify-center top-[50%] left-[50%] transform translate-y-[-50%] translate-x-[-50%] bg-white max-w-[400px] p-16 pt-20 text-center rounded-[20px]">
        <h3 className="font-bold">Log in to tripzz</h3>
        <div className="mt-6 text-[.875em]">
          <div className="py-3 rounded-full border text-[.8em] text-white font-bold bg-[#1877F2] hover:bg-[#1864f2] cursor-pointer">
            Log in with Facebook
          </div>
          <div className="py-3 rounded-full border text-[.8em] text-dark-grey font-bold mt-2 bg-white hover:bg-light-grey cursor-pointer">
            Log in with Gmail
          </div>
          <div className="relative w-full mt-6 border-t">
            <p className="w-[36px] bg-white absolute text-[.75em] text-dark-grey font-bold top-[50%] left-[50%] transform translate-y-[-50%] translate-x-[-50%]">
              or
            </p>
          </div>
          <div className="mt-6">
            <input
              type="text"
              placeholder="Email"
              className="w-full px-5 py-3 border rounded-full text-[.8em] mt-2"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-5 py-3 border rounded-full text-[.8em] mt-2"
            />
            <div className="flex flex-col mt-4">
              <button
                className="font-bold text-[.875em] hover:text-dark-grey"
                onClick={onLogin}
              >
                Log in
              </button>
              <button className="font-bold text-[.7em] hover:text-dark-grey mt-4">
                Forgot your password?
              </button>
              <button
                className="text-[.8em] mt-4 hover:text-dark-grey"
                onClick={changeModal}
              >
                Don't have an account yet?{" "}
                <span className="font-bold">Sign up</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
export default LoginModal;
