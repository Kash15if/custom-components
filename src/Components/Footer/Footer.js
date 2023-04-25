import "./FooterStyle.css";
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
></link>;
const Footer = () => {
  return (
    <div>
      <footer>
        <div class="footer">
          <div class="row IconAlign">
            <a href="https://www.linkedin.com/in/kashif-ahmad-373286164/">
              <img
                src="https://cdn-icons-png.flaticon.com/512/145/145807.png"
                alt="Linkedin"
                width="24px"
              />
            </a>
            <a href="https://github.com/Kash15if">
              <img
                src="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
                alt="Github"
                width="24px"
              />
            </a>
            <a href="#">
              <img
                src="https://cdn-icons-png.flaticon.com/512/145/145802.png"
                alt="Facebook"
                width="24px"
              />
            </a>
          </div>

          <div class="row">
            Copyright © 2023 - All rights reserved || Designed By: Kashif
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
