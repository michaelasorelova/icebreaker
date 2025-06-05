import './style.css';

export const About = () => {
  return (
    <div className="container">
      <section className="about">

        <h2 className="about__heading">O projektu</h2>

        <div className="about__text">
          <p>
            Nevíte, jak rozproudit konverzaci? Icebreaker je mobilní aplikace, která vám pomůže prolomit ledy na rande. Generuje otázky na základě vašich preferencí. Pro odvážnější je součástí také oblíbená hra pravda nebo úkol (flaška), přidávající konverzaci zábavný náboj.
          </p>
          <p>
            Aplikace vznikla jako závěrečný projekt kurzu Digitální akademie – Web (jaro 2025) neziskové organizace Czechitas. Autorky Michaela Šorelová a Simona Šusterová dobře ví, jak těžké může být začít mluvit, a proto vytvořily nástroj, který pomáhá překonat trapné ticho.
          </p>
        </div>
        
      </section>
    </div>
  );
};