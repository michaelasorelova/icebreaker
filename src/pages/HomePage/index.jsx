import './style.css';
import icebergsImg from "./img/icebergs.svg";

export const HomePage = () => {
  return (
    <main className="home">
        <div className="content-wrapper">
            <section className="intro">
                <p className="intro__text">
                Ticho je fajn, ale ne na rande. <strong>Icebreaker</strong> vám pomůže prolomit ledy.
                </p>

                <img
                className="intro__image"
                src={icebergsImg}
                alt="Ledovce"
                />

                <div className="intro__options">
                    <h2 className="intro__heading">Jak chcete začít?</h2>
                    <div className="buttons">
                        <button className="button">Na rozehřátí</button>
                        <button className="button">Zábavné</button>
                        <button className="button">Co by kdyby</button>
                        <button className="button">Na tělo</button>
                        <button className="button">Do hloubky</button>
                        <button className="button">Mix všeho</button>
                        <button className="button button--full">Pravda nebo úkol</button>
                    </div>
                </div>
            </section>
      </div>
    </main>
  );
};