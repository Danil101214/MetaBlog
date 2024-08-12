import React, { useContext } from 'react'
import { category, quickLink } from '../ArraysComponent'
import { Link } from 'react-router-dom'
import './footer.scss'
import { BackgroundColorContext } from '../../App'

const Footer = () => {
  const logo1 = new URL('../../../public/Footer/Logo_1.svg', import.meta.url).href;
  const logo2 = new URL('../../../public/Footer/Logo_2.svg', import.meta.url).href;
  const {backgroundColor} = useContext(BackgroundColorContext)

  return (
    <div className='footer' style={{backgroundColor: backgroundColor == "#181A2A" ? "rgb(20, 22, 36)" : "rgb(246, 246, 247)",
    borderTop: backgroundColor == "#181A2A" ? "1px solid rgb(36, 37, 53)" : "1px solid rgb(232, 232, 234)"}}>
      <div className="footer__container">
        <div className="footer__inner">
          <div className="footer__content">
            <div className="footer__content-about about">
              <h3 className="about__title title" style={{color: backgroundColor == "#181A2A" && "#FFFFFF"}}>About</h3>
              <p className="about__subtitle" style={{color: backgroundColor == "#181A2A" && "rgb(186, 186, 191)"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
              <p className="about__email" style={{color: backgroundColor == "#181A2A" && "#FFFFFF"}}>Email: <Link href="info@jstemplate.net" style={{color: backgroundColor == "#181A2A" && "rgb(151, 152, 159)", fontWeight: "400"}}>info@jstemplate.net</Link></p>
              <p className="about__phone" style={{color: backgroundColor == "#181A2A" && "#FFFFFF"}}>Phone: <Link href="880 123 456 789" style={{color: backgroundColor == "#181A2A" && "rgb(151, 152, 159)", fontWeight: "400"}}>880 123 456 789</Link></p>
            </div>
            <nav className="footer__content-menu menu__footer">
              <ul className="menu__footer-list">
                <li className="menu__footer-item">
                  <p className="menu__footer-link title" style={{color: backgroundColor == "#181A2A" && "#FFFFFF"}}>Quick Link</p>
                </li>
                {quickLink.map((item) => 
                  <li className="menu__footer-item" key={item.id}>
                    <Link className="menu__footer-link" to={item.to} style={{color: backgroundColor == "#181A2A" && "rgb(186, 186, 191)"}}>{item.value}</Link>
                  </li>
                )}
              </ul>
              <ul className="menu__footer-list">
                <li className="menu__footer-item">
                  <p className="menu__footer-link title" style={{color: backgroundColor == "#181A2A" && "#FFFFFF"}}>Category</p>
                </li>
                {category.map((item) => 
                  <li className="menu__footer-item" key={item.id}>
                    <Link className="menu__footer-link" to={"#"} style={{color: backgroundColor == "#181A2A" && "rgb(186, 186, 191)"}}>{item.value}</Link>
                  </li>
                )}
              </ul>
            </nav>
            <form action="#" className="footer__content-form form" style={{backgroundColor: backgroundColor == "#181A2A" ? "rgb(36, 37, 53)" : "#FFFFFF"}}>
              <h3 className="form__title" style={{color: backgroundColor == "#181A2A" && "#FFFFFF"}}>Weekly Newsletter</h3>
              <p className="form__subtitle">Get blog articles and offers via email</p>
              <input type="email" className="form__email" placeholder='Your Email' style={{backgroundColor: backgroundColor == "#181A2A" && "rgb(24, 26, 42)", border: backgroundColor == "#181A2A" && "1px solid rgb(59, 60, 74)"}}/>
              <button className="form__subscribe">Subscribe</button>
            </form>
          </div>
          <div className="footer__copy" style={{borderTop: backgroundColor == "#181A2A" && "1px solid rgb(36, 37, 53)"}}>
            <div className="footer__copy-metaBlog metaBlog">
              <img src={backgroundColor == "#181A2A" ? logo2 : logo1} alt="MetaBlog" className="metaBlog__image" />
              <div className="metaBlog__textBox">
                <p className="metaBlog__textBox-title" style={{color: backgroundColor == "#181A2A" && "#FFFFFF"}}>MetaBlog</p>
                <p className="metaBlog__textBox-right" style={{color: backgroundColor == "#181A2A" && "rgb(186, 186, 191)"}}> <span style={{color: backgroundColor == "#181A2A" && "#FFFFFF"}}>© JS Template</span> <time dateTime="2023">2023.</time> All Rights Reserved.</p>
              </div>
            </div>
            <nav className="footer__copy-navigation navigation">
              <ul className="navigation__list" style={{color: backgroundColor == "#181A2A" ? "rgb(186, 186, 191)" : "rgb(59, 60, 74)"}}>
                <li className="navigation__item">
                  <Link className="navigation-link" to={"#"}>Terms of Use</Link>
                </li>
                <li className="navigation__item" to={"#"} style={{borderLeft: backgroundColor == "#181A2A" ? "1px solid rgb(36, 37, 53)" : "1px solid rgb(232, 232, 234)"}}>
                  <Link className="navigation-link">Privacy Policy</Link>
                </li>
                <li className="navigation__item" style={{borderLeft: backgroundColor == "#181A2A" ? "1px solid rgb(36, 37, 53)" : "1px solid rgb(232, 232, 234)"}}>
                  <Link className="navigation-link" to={"#"}>Cookie Policy</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;