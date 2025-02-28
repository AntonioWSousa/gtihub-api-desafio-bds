import './styles.css';
import ResultCard from 'components/ResultCard';
import { useState } from 'react';
import axios from 'axios';

type FormData = {
  login: string;
};

type Address = {
  avatar_url: string;
  url: string;
  followers: string;
  location: string;
  name: string;
};

const Search = () => {
  const [address, setAdress] = useState<Address>();

  const [formData, setFormData] = useState<FormData>({
    login: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .get(`https://api.github.com/users/${formData.login}`)
      .then((response) => {
        setAdress(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setAdress(undefined);
        console.log(error);
      });
  };

  return (
    <div className="cep-search-container">
      <div className="container search-container">
        <div className="cep-container-top">
          <h1>Encontre um perfil Github</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-container">
              <input
                type="text"
                name="login"
                value={formData.login}
                className="search-input"
                placeholder="Enter your GitHub user"
                onChange={handleChange}
              />
              <button type="submit" className="btn btn-primary search-button">
                Encontrar
              </button>
            </div>
          </form>
        </div>

        <div className="cep-card-result-content">
          <div className="cep-card-img">
            {address && (
              <img src={address?.avatar_url} alt="Foto do perfil Github" />
            )}
          </div>
          <div className="cep-card-result">
            {address && (
              <>
                <h5>Informações</h5>
                <ResultCard title="Perfil:" description={address.url} />
                <ResultCard
                  title="Seguidores:"
                  description={address.followers}
                />
                <ResultCard
                  title="Localidade:"
                  description={address.location}
                />
                <ResultCard title="Nome:" description={address.name} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
