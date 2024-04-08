import './App.css'
import {Button} from "@nextui-org/react";
import {Switch} from "@nextui-org/react";
import {MoonIcon} from "./MoonIcon";
import {SunIcon} from "./SunIcon";
import React from 'react';
import {Input} from "@nextui-org/react";
import {Slider} from "@nextui-org/react";
import LinkedInIcon from "./LinkedInIcon";
import GitHubIcon from "./GitHubIcon";
import TwitterIcon from "./TwitterIcon";
import DiscordIcon from './DiscordIcon';


class PasswordGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            length: 12,
            upperCase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lowerCase: 'abcdefghijklmnopqrstuvwxyz',
            numbers: '0123456789',
            specialCharacters: '!@#$%^&*=/\()-[]_+',
            allCharacters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*=/\()-[]_+',
            darkMode: false
        };
    }

    toggleDarkMode = () => {
        this.setState(prevState => ({
            darkMode: !prevState.darkMode
        }));
    }

    createPassword = () => {
        let password = '';
        const { length, upperCase, lowerCase, numbers, specialCharacters, allCharacters } = this.state;
        
        password += upperCase.charAt(Math.floor(Math.random() * upperCase.length));
        password += lowerCase.charAt(Math.floor(Math.random() * lowerCase.length));
        password += numbers.charAt(Math.floor(Math.random() * numbers.length));
        password += specialCharacters.charAt(Math.floor(Math.random() * specialCharacters.length));

        while (password.length < length) {
            password += allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));
        }

        this.animatePassword(password); // Agregar animación a la nueva contraseña
        this.setState({ password });
    }

    copyPassword = () => {
        const passwordBox = document.getElementById('password');
        passwordBox.select();
        document.execCommand('copy');
        alert('Password copied to clipboard');
    }

    handleSliderChange = (value) => {
        this.setState({ length: value }, () => {
            this.createPassword(); // Generar una nueva contraseña al cambiar la longitud
        });
    }
    animatePassword = (password) => {
        let index = 0;
        const intervalId = setInterval(() => {
            if (index <= password.length) {
                const partialPassword = password.slice(0, index);
                this.setState({ password: partialPassword });
                index++;
            } else {
                clearInterval(intervalId);
            }
        }, 100); // Intervalo de tiempo entre cada letra (en milisegundos)
    }


    render() {
        const colors = ["secondary"];
        return (
            <div className={`container ${this.state.darkMode ? 'dark' : 'light'}`}>
                <div className="navbar">
                    <div className="icons-top-left">
                        <a href=''><LinkedInIcon /></a>
                        <a href='https://github.com/Hugosc05'><GitHubIcon /></a>
                        <a href='https://twitter.com/Hugoo05_'><TwitterIcon /></a>
                        <a href=''><DiscordIcon /></a>
                    </div>
                    <div className="top-right">
                        <Switch
                            defaultSelected={this.state.darkMode}
                            size="lg"
                            color="secondary"
                            onChange={this.toggleDarkMode}
                            thumbIcon={({ isSelected, className }) =>
                                isSelected ? (
                                    <SunIcon className={className} />
                                ) : (
                                    <MoonIcon className={className} />
                                )
                            }
                        >
                            Dark mode
                        </Switch>
                    </div>
                </div>
                <h1 className={`${this.state.darkMode ? 'dark' : 'light'}`}><span>Password</span> <span>Generator</span></h1>
                <div className="password-display">
                    <Input type="text" label="Password" id="password" value={this.state.password} readOnly placeholder="Password" />
                    <Button className="copy-button" onClick={this.copyPassword}>Copy Password</Button>
                </div>
                <div className="button-container">
                    <Button radius="full" className="generate-button bg-gradient-to-tr from-purple-500 to-blue-600 text-white shadow-lg" onClick={this.createPassword}>Generate Password</Button>
                </div>
                <div style={{ marginTop: '20px' }}>
                    {colors.map((color) => (
                        <Slider
                            label="Password Length"
                            value={this.state.length}
                            onChange={this.handleSliderChange}
                            showTooltip={true}
                            key={color}
                            color={color}
                            minValue={8}
                            maxValue={32}
                            defaultValue={32}
                            marks={[
                                { value: 8, label: '8' },
                                { value: 16, label: '16' },
                                { value: 24, label: '24' },
                                { value: 32, label: '32' }
                            ]}
                            step={1}
                            maxWidth="calc(32 * (100% / 32))" // Calcula el ancho máximo basado en el rango
                        />
                    ))}
                </div>
                <footer className="footer">
                    <p className="copyright"> &copy; 2024 Hugosc05 Inc. </p>
                </footer>
            </div>
        );
    }
}

export default PasswordGenerator;