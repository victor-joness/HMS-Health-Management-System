import React, { useState } from 'react';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import Button from "../../../../Components/Perfil/Button/Button";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

import './DoutorPerfilEditarSenha.css';

const PasswordInput = ({ label, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="password-input">
      <label>{label}</label>
      <div className="input-container">
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          className='user-perfil-editar-senha-input'
        />
        <button onClick={toggleShowPassword} className='user-perfil-editar-senha-input-show'>
          {showPassword ? <FaRegEyeSlash/> : <FaRegEye/>}
        </button>
      </div>
    </div>
  );
};

const DoutorPerfilEditarSenha = () => {
  const [senhaAnterior, setSenhaAnterior] = useState('');
  const [senhaNova, setSenhaNova] = useState('');
  const [senhaNovaConfirmar, setSenhaNovaConfirmar] = useState('');

  return (
    <div className="user-perfil-editar-senha">
      <PasswordInput
        label="Senha Anterior"
        value={senhaAnterior}
        onChange={(e) => setSenhaAnterior(e.target.value)}
      />
      <PasswordInput
        label="Senha Nova"
        value={senhaNova}
        onChange={(e) => setSenhaNova(e.target.value)}
      />
      <PasswordInput
        label="Confirme a Senha Nova"
        value={senhaNovaConfirmar}
        onChange={(e) => setSenhaNovaConfirmar(e.target.value)}
      />
      <Button
        label={'Salvar Nova Senha'}
        Icon={HiOutlineCheckCircle}
        onClick={() => {
          toast.error('VAMOS FAZER ESSA FUNÇÃO AINDA');
        }}
      />
    </div>
  );
};

export default DoutorPerfilEditarSenha;