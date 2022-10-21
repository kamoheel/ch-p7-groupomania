import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function SignupComponent({ handleSignUpSuccess }) {
    const [errors, setErrors] = useState({});
    const [pseudo, setPseudo] = useState('');
    const [terms, setTerms] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLetterOk, setIsLetterOk] = useState(false);
    const [isNumberOk, setIsNumberOk] = useState(false);
    const [isSpecialOk, setIsSpecialOk] = useState(false);
    const [isMinMaxOk, setIsMinMaxOk] = useState(false);
    const navigate = useNavigate();

    const regexEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const regexPseudo =
    /^[0-9a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    const regexPassword =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&éè])[A-Za-z\d@$!%*#?&éè]{6,32}$/; // Minimum 6 caractères, au moins une lettre, un chiffre et un caractère spécial
    const regexLetter = /[a-zA-Z]/g; // Check si le string contient au moins une lettre
    const regexNum = /\d/; // Check s'il y a un chiffre
    const regexSpecial = /[@$!%*#?&éè]/;
    const regexMinMax = /^.{6,32}$/; // Check si le mdp contient minimum 6 caractères et maximum 32

    const handleEmailInput = (e) => {
        setEmail(e.target.value);
        if (regexEmail.test(e.target.value) || e.target.value.length === 0) {
          setErrors({ email: "" });
        } else {
          setErrors({ ...errors, email: "Veuillez entrer une adresse e-mail valide" });
        }
      };

      const handlePseudoInput = (e) => {
        setPseudo(e.target.value);
        if (
          regexPseudo.test(e.target.value) === true ||
          e.target.value.length === 0
        ) {
          setErrors({ ...errors, pseudo: "" });
        } else {
          setErrors({ ...errors, pseudo: "Ne doit contenir que des lettres, chiffres et tirets" });
        }
      };

      const handlePasswordInput = (e) => {
        setPassword(e.target.value);
        if (regexLetter.test(e.target.value)) {
          setIsLetterOk(true);
        } else {
          setIsLetterOk(false);
        }
        if (regexNum.test(e.target.value)) {
          setIsNumberOk(true);
        } else {
          setIsNumberOk(false);
        }
        if (regexSpecial.test(e.target.value)) {
          setIsSpecialOk(true);
        } else {
          setIsSpecialOk(false);
        }
        if (regexMinMax.test(e.target.value)) {
          setIsMinMaxOk(true);
        } else {
          setIsMinMaxOk(false);
        }
      };


    const handleSignup = (e) => {
        e.preventDefault();

        if (!terms) {
            setErrors({
              ...errors,
              terms: "Veuillez accepter les conditions d'utilisation",
            });
          } else {
            setErrors({ ...errors, terms: "" });
          }

        if (
            !regexPassword.test(password) ||
            !terms ||
            !regexPseudo.test(pseudo) ||
            !regexEmail.test(email)
          ) {
            console.log(
              'il y a une erreur', regexPassword.test(password), terms, regexPseudo.test(pseudo), regexEmail.test(email) );
            return;
          } else {
            axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/auth/signup`,
                data: {
                    pseudo,
                    email,
                    password,
                }
            })
                .then((res) => {
                    if (!res.data.errors) {
                        navigate("/login");
                        handleSignUpSuccess();
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
          }
    };

    return (
      <div>
        <div className='form-container'>
            <h2 className='form-container--title'>S'inscrire</h2>
            <form className='form' onSubmit={handleSignup}>
                    <label className='form--label' htmlFor='pseudo'> Pseudo : <br />
                        <input 
                            className='form--input'
                            type="pseudo" 
                            id="pseudo" 
                            placeholder="JohnDoe31"
                            onChange={handlePseudoInput} 
                            value={pseudo} 
                        /> 
                        <br />
                    </label>
                    <div className='pseudo error'>{errors.pseudo}</div>
                    <label className='form--label' htmlFor='email'> E-mail : <br />
                        <input 
                            className='form--input'
                            type="email" 
                            id="email" 
                            placeholder="exemple@groupomania.fr"
                            onChange={handleEmailInput} 
                            value={email} 
                        /> 
                        <br />
                    </label>
                    <div className='email error'>{errors.email}</div>
                    <br />
                    <label className='form--label' htmlFor='password'> Mot de Passe : <br />
                        <input 
                            className='form--input'
                            type="password" 
                            id="password" 
                            placeholder="Entrez un mot de passe"
                            onChange={handlePasswordInput}  
                            value={password}
                        /> 
                        <br />
                    </label>
                    <div className='password error'>{errors.password}</div>
                    <div className="password-container">
                        <ul>
                            <li className={isLetterOk ? "password-ok" : "password-not"}>
                            {isLetterOk ? (<FontAwesomeIcon className='faIcon' icon={faCheck} />) : (<FontAwesomeIcon className='faIcon' icon={faXmark} />) } 
                            Une lettre 
                            </li>
                            <li className={isNumberOk ? "password-ok" : "password-not"}>
                            {isNumberOk ? (<FontAwesomeIcon className='faIcon' icon={faCheck} />) : (<FontAwesomeIcon className='faIcon' icon={faXmark} />) }
                            Un chiffre 
                            </li>
                            <li
                            className={isSpecialOk ? "password-ok" : "password-not"}>
                            {isSpecialOk ? (<FontAwesomeIcon className='faIcon' icon={faCheck} />) : (<FontAwesomeIcon className='faIcon' icon={faXmark} />) }
                            Un caractère spécial 
                            </li>
                            <li className={isMinMaxOk ? "password-ok" : "password-not"}>
                            {isMinMaxOk ? (<FontAwesomeIcon className='faIcon' icon={faCheck} />) : (<FontAwesomeIcon className='faIcon' icon={faXmark} />) }
                            6-32 caractères
                            </li>
                        </ul>
                    </div>
                    <br />
                    <div className="cgu-container">
                      <input 
                        className='form--input'
                        type="checkbox"
                        id="terms"
                        onChange={(e) => setTerms(e.target.checked)}
                      />
                      <label htmlFor="terms" className="terms">
                        J'ai lu et j'accepte les{" "}
                        <NavLink target="_blank" to="/cgu" className="cgu-box">
                          conditions générales
                        </NavLink>
                      </label>
                    </div>

                <div className="terms error">{errors.terms}</div>
                <br />
                <button className='form--btn' type="submit">S'inscrire</button>
            </form>
        </div>
      {/* )} */}
      </div>
    )
}

export default SignupComponent