import Link from "next/link";
import { FiLock, FiMail, FiKey, FiArrowLeft, FiShield } from "react-icons/fi";

export default function LoginPage() {
  return (
    <div className="hero min-h-screen bg-base-100">
      <div className="hero-content flex-col w-full max-w-sm">
        <div className="text-center mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mx-auto mb-3">
            <FiShield className="w-6 h-6 text-primary-content" />
          </div>
          <h1 className="text-2xl font-bold">Login Bendahara</h1>
          <p className="text-sm text-base-content/70 mt-1">
            Akses Admin Iskandar Pocket
          </p>
        </div>

        <div className="card bg-base-200 w-full shrink-0 shadow-2xl border border-base-300">
          <div className="card-body">
            <form className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Email Admin</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-base-content/50">
                    <FiMail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    placeholder="admin@iskandarpocket.com"
                    className="input input-bordered w-full pl-10"
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Password</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-base-content/50">
                    <FiKey className="w-4 h-4" />
                  </span>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="input input-bordered w-full pl-10"
                    required
                  />
                </div>
              </div>

              <div className="form-control mt-6">
                <button
                  type="button"
                  className="btn btn-primary w-full font-semibold"
                >
                  <FiLock className="w-4 h-4 mr-1" />
                  Masuk ke Dashboard
                </button>
              </div>
            </form>

            <div className="text-center pt-4 mt-2 border-t border-base-300">
              <Link
                href="/"
                className="inline-flex items-center text-sm font-medium text-primary hover:underline"
              >
                <FiArrowLeft className="w-4 h-4 mr-1.5" />
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
