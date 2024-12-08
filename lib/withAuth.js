import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "./supabaseClient";

const withAuth = (WrappedComponent) => {
  const WithAuth = (props) => {
    const router = useRouter();

    useEffect(() => {
      const checkSession = async () => {
        const { data } = await supabase.auth.getSession();
        if (!data.session) {
          router.push("/login");
        }
      };

      checkSession();
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  // Establece el displayName para ayudar en la depuración
  WithAuth.displayName = `WithAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithAuth;
};

export default withAuth;
