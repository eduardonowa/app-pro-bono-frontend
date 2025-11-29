<template>
  <footer>
    <div class="container footer-content">
      <div class="footer-section about">
        <h4>Rigon e Fassina Advogados Associados</h4>
        <p>
          Este é um projeto de extensão acadêmica. As informações aqui não constituem aconselhamento
          jurídico.
        </p>
      </div>
      <div class="footer-section contact">
        <h4>Contato</h4>
        <p>
          <a
            href="https://maps.google.com/?q=Rua+Santa+Catarina,+29,+sala+33,+Erechim+-+RS"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rua Santa Catarina, n° 29, sala 33<br />
            Erechim - RS, CEP 99700-290
          </a>
        </p>
        <p><a href="tel:+555433334444">(54) 3333-4444</a></p>
        <p><a href="mailto:contato@rigonefassina.adv.br">contato@rigonefassina.adv.br</a></p>
      </div>
    </div>
    <div class="footer-bottom">
      &copy; {{ new Date().getFullYear() }} Rigon e Fassina Advogados Associados. Todos os direitos
      reservados.
    </div>
  </footer>
</template>

<style scoped>
footer {
  background-color: #333;
  color: #ccc;
  padding-top: 3rem;
  font-size: 0.9rem;
}
.footer-content {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  padding-bottom: 2rem;
  flex-wrap: wrap;
}
.footer-section {
  flex: 1;
  min-width: 250px;
}
.footer-section h4 {
  color: #fff;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}
.footer-section p {
  margin-bottom: 0.75rem;
  line-height: 1.7;
}
.footer-section a {
  color: #ccc;
  transition: color 0.3s ease;
}
.footer-section a:hover {
  color: #fff;
  text-decoration: underline;
}
.footer-bottom {
  background-color: #222;
  text-align: center;
  padding: 1rem 0;
  font-size: 0.8rem;
}
</style>
