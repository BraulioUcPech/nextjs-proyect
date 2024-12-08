import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

export default function ContactHero({ block, dataBinding }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Verifica si supabase y supabase.auth están definidos
    if (supabase && supabase.auth) {
      // Obtén el usuario logueado cuando el componente se monte
      const getSession = async () => {
        const { data: session } = await supabase.auth.getSession();
        if (session) {
          setUser(session.user); // Establece el usuario en el estado si está logueado
        }
      };
      getSession();

      // Escucha los cambios en la sesión (por si el usuario se autentica o desautentica)
      const { data: authListener } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setUser(session?.user); // Actualiza el usuario
        }
      );

      return () => {
        // Elimina el listener cuando el componente se desmonte
        authListener.subscription.unsubscribe();
      };
    }
  }, []);

  return (
    <section className="contact" data-cms-bind={dataBinding}>
      <div className="container">
        <div className="row">
          <div className="col-lg-5 me-auto order-2 order-lg-1">
            <div className="contact-form-Information">
              <div className="address">
                {block.address && (
                  <>
                    <h3>{block.address.heading}</h3>
                    <p>{block.address.address}</p>
                  </>
                )}
                <div className="item mb-4">
                  {block.phone && (
                    <>
                      <h3>{block.phone.heading}</h3>
                      <Link href={`tel:${block.phone.cell}`}>
                        {block.phone.cell}
                        <span>
                          <img
                            src={block.phone.image}
                            alt={block.phone.image_alt}
                            loading="lazy"
                          />
                        </span>
                      </Link>
                    </>
                  )}
                  {user && block.form.user_email && (
                    <>
                      <div className="col-md-12">
                        <label htmlFor="user-email" className="label">
                          {block.form.user_email.heading}
                        </label>
                        <p>{user.email}</p>{" "}
                        {/* Muestra el correo del usuario logueado */}
                      </div>
                    </>
                  )}
                </div>
                <div className="item">
                  {block.email && (
                    <>
                      <h3>{block.email.heading}</h3>
                      <Link href={`tel:${block.email.email}`}>
                        {block.email.email}
                        <span>
                          <img
                            src={block.email.image}
                            alt={block.email.image_alt}
                            loading="lazy"
                          />
                        </span>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 order-1 order-lg-2">
            <div className="contact-form">
              {block.form && (
                <>
                  <form method="post">
                    <h3>{block.form.heading}</h3>
                    {block.form.fullname && (
                      <>
                        <div className="col-md-12">
                          <label htmlFor="Name" className="label">
                            {block.form.fullname.heading}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="Name"
                            name="name"
                            placeholder={block.form.fullname.placeholder}
                            required=""
                          />
                        </div>
                      </>
                    )}
                    {block.form.phone_number && (
                      <>
                        <div className="col-md-12">
                          <label htmlFor="phone-number" className="label">
                            {block.form.phone_number.heading}
                          </label>
                          <input
                            type="tel"
                            className="form-control"
                            id="phone-number"
                            name="phone-number"
                            placeholder={block.form.phone_number.placeholder}
                            required=""
                          />
                        </div>
                      </>
                    )}
                    {block.form.email && (
                      <div className="col-md-12">
                        <label htmlFor="email" className="label">
                          {block.form.email.heading}
                        </label>
                        <input
                          type="email"
                          className="form-control mb-6"
                          id="email"
                          name="_replyto"
                          placeholder={block.form.email.placeholder}
                          required
                          value={user ? user.email : ""} // Muestra el correo del usuario logueado
                          readOnly // Opcional, para hacer que el campo no sea editable
                        />
                      </div>
                    )}
                    {block.form.message && (
                      <>
                        <div className="col-md-12">
                          <label htmlFor="message" className="label">
                            {block.form.message.heading}
                          </label>
                          <textarea
                            className="form-control mb-4"
                            id="floatingTextarea2"
                            name="message"
                            placeholder={block.form.message.placeholder}
                            rows="8"
                            spellCheck="false"
                          />
                        </div>
                      </>
                    )}

                    <input
                      type="text"
                      name="_gotcha"
                      style={{ display: "none" }}
                    />

                    {block.form.submit_button && (
                      <div className="col-12">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg mt-7"
                        >
                          <span className="position-relative">
                            {block.form.submit_button.text}
                          </span>
                        </button>
                      </div>
                    )}
                  </form>
                </>
              )}
              <div className="effect"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
