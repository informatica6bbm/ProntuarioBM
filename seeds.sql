INSERT INTO batalhao(abreviacao, descricao) VALUES('1º BBM', '1º Batalhão de Bombeiro Militar de Santa Catarina');
INSERT INTO batalhao(abreviacao, descricao) VALUES('2º BBM', '2º Batalhão de Bombeiro Militar de Santa Catarina');
INSERT INTO batalhao(abreviacao, descricao) VALUES('3º BBM', '3º Batalhão de Bombeiro Militar de Santa Catarina');
INSERT INTO batalhao(abreviacao, descricao) VALUES('4º BBM', '4º Batalhão de Bombeiro Militar de Santa Catarina');
INSERT INTO batalhao(abreviacao, descricao) VALUES('5º BBM', '5º Batalhão de Bombeiro Militar de Santa Catarina');
INSERT INTO batalhao(abreviacao, descricao) VALUES('6º BBM', '6º Batalhão de Bombeiro Militar de Santa Catarina');
INSERT INTO batalhao(abreviacao, descricao) VALUES('7º BBM', '7º Batalhão de Bombeiro Militar de Santa Catarina');
INSERT INTO batalhao(abreviacao, descricao) VALUES('8º BBM', '8º Batalhão de Bombeiro Militar de Santa Catarina');
INSERT INTO batalhao(abreviacao, descricao) VALUES('9º BBM', '9º Batalhão de Bombeiro Militar de Santa Catarina');
INSERT INTO batalhao(abreviacao, descricao) VALUES('10º BBM', '10º Batalhão de Bombeiro Militar de Santa Catarina');
INSERT INTO batalhao(abreviacao, descricao) VALUES('11º BBM', '11º Batalhão de Bombeiro Militar de Santa Catarina');
INSERT INTO batalhao(abreviacao, descricao) VALUES('12º BBM', '12º Batalhão de Bombeiro Militar de Santa Catarina');
INSERT INTO batalhao(abreviacao, descricao) VALUES('13º BBM', '13º Batalhão de Bombeiro Militar de Santa Catarina');
INSERT INTO batalhao(abreviacao, descricao) VALUES('14º BBM', '14º Batalhão de Bombeiro Militar de Santa Catarina');

INSERT INTO setor(setor, descricao, idLocal) VALUES('B1', 'B1', 6);
INSERT INTO setor(setor, descricao, idLocal) VALUES('B2', 'B2', 6);
INSERT INTO setor(setor, descricao, idLocal) VALUES('B3', 'B3', 6);
INSERT INTO setor(setor, descricao, idLocal) VALUES('B4', 'B4', 6);
INSERT INTO setor(setor, descricao, idLocal) VALUES('B5', 'B5', 6);

INSERT INTO hierarquia(hierarquia, descricao) VALUES('SD', 'Soldado Bombeiro Militar');
INSERT INTO hierarquia(hierarquia, descricao) VALUES('CB', 'Cabo Bombeiro Militar');
INSERT INTO hierarquia(hierarquia, descricao) VALUES('3º SGT', '3º SGT Bombeiro Militar');
INSERT INTO hierarquia(hierarquia, descricao) VALUES('2º SGT', '2º SGT Bombeiro Militar');
INSERT INTO hierarquia(hierarquia, descricao) VALUES('1º SGT', '1º SGT Bombeiro Militar');
INSERT INTO hierarquia(hierarquia, descricao) VALUES('ST', 'Sub Ten Bombeiro Militar');
INSERT INTO hierarquia(hierarquia, descricao) VALUES('2º TEN', '2º Tenente Bombeiro Militar');
INSERT INTO hierarquia(hierarquia, descricao) VALUES('1º TEN', '1º Tenente Bombeiro Militar');
INSERT INTO hierarquia(hierarquia, descricao) VALUES('CAP', 'Capitão Bombeiro Militar');
INSERT INTO hierarquia(hierarquia, descricao) VALUES('MAJ', 'Major Bombeiro Militar');
INSERT INTO hierarquia(hierarquia, descricao) VALUES('TEN CEL', 'Tenente Coronel Bombeiro Militar');
INSERT INTO hierarquia(hierarquia, descricao) VALUES('CEL', 'Coronel Bombeiro Militar');

INSERT INTO escala(escala) VALUES('ADMINISTRATIVO');

INSERT INTO pessoa(usuario, email,nome,matricula,dataNascimento,estadoCivil,dataIngresso,cartaoMunicipalSus, cartaoNacionalSus,sexo,tipoSanguineo,lts,tipoPessoa,idHierarquia,idSetor,idBatalhao,idEscala)
    VALUES('6b4aux', '6b4aux@cbm.sc.gov.br', '6b4aux', '123456-8','1997-05-05', 'SOLTEIRO', '2018-01-02', '123456', '9999 9999 9999 999', 'MASCULINO', 'O+', 1, 1,1,4,6,1);
