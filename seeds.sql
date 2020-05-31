INSERT INTO batalhao(abreviacao, descricao, createdAt, updatedAt) VALUES('1º BBM', '1º Batalhão de Bombeiro Militar de Santa Catarina', '2020-05-29', '2020-05-29');
INSERT INTO batalhao(abreviacao, descricao, createdAt, updatedAt) VALUES('2º BBM', '2º Batalhão de Bombeiro Militar de Santa Catarina', '2020-05-29', '2020-05-29');
INSERT INTO batalhao(abreviacao, descricao, createdAt, updatedAt) VALUES('3º BBM', '3º Batalhão de Bombeiro Militar de Santa Catarina', '2020-05-29', '2020-05-29');
INSERT INTO batalhao(abreviacao, descricao, createdAt, updatedAt) VALUES('4º BBM', '4º Batalhão de Bombeiro Militar de Santa Catarina', '2020-05-29', '2020-05-29');
INSERT INTO batalhao(abreviacao, descricao, createdAt, updatedAt) VALUES('5º BBM', '5º Batalhão de Bombeiro Militar de Santa Catarina', '2020-05-29', '2020-05-29');
INSERT INTO batalhao(abreviacao, descricao, createdAt, updatedAt) VALUES('6º BBM', '6º Batalhão de Bombeiro Militar de Santa Catarina', '2020-05-29', '2020-05-29');
INSERT INTO batalhao(abreviacao, descricao, createdAt, updatedAt) VALUES('7º BBM', '7º Batalhão de Bombeiro Militar de Santa Catarina', '2020-05-29', '2020-05-29');
INSERT INTO batalhao(abreviacao, descricao, createdAt, updatedAt) VALUES('8º BBM', '8º Batalhão de Bombeiro Militar de Santa Catarina', '2020-05-29', '2020-05-29');
INSERT INTO batalhao(abreviacao, descricao, createdAt, updatedAt) VALUES('9º BBM', '9º Batalhão de Bombeiro Militar de Santa Catarina', '2020-05-29', '2020-05-29');
INSERT INTO batalhao(abreviacao, descricao, createdAt, updatedAt) VALUES('10º BBM', '10º Batalhão de Bombeiro Militar de Santa Catarina', '2020-05-29', '2020-05-29');
INSERT INTO batalhao(abreviacao, descricao, createdAt, updatedAt) VALUES('11º BBM', '11º Batalhão de Bombeiro Militar de Santa Catarina', '2020-05-29', '2020-05-29');
INSERT INTO batalhao(abreviacao, descricao, createdAt, updatedAt) VALUES('12º BBM', '12º Batalhão de Bombeiro Militar de Santa Catarina', '2020-05-29', '2020-05-29');
INSERT INTO batalhao(abreviacao, descricao, createdAt, updatedAt) VALUES('13º BBM', '13º Batalhão de Bombeiro Militar de Santa Catarina', '2020-05-29', '2020-05-29');
INSERT INTO batalhao(abreviacao, descricao, createdAt, updatedAt) VALUES('14º BBM', '14º Batalhão de Bombeiro Militar de Santa Catarina', '2020-05-29', '2020-05-29');

INSERT INTO setor(setor, descricao, idLocal, createdAt, updatedAt) VALUES('B1', 'B1', 6, '2020-05-29', '2020-05-29');
INSERT INTO setor(setor, descricao, idLocal, createdAt, updatedAt) VALUES('B2', 'B2', 6, '2020-05-29', '2020-05-29');
INSERT INTO setor(setor, descricao, idLocal, createdAt, updatedAt) VALUES('B3', 'B3', 6, '2020-05-29', '2020-05-29');
INSERT INTO setor(setor, descricao, idLocal, createdAt, updatedAt) VALUES('B4', 'B4', 6, '2020-05-29', '2020-05-29');
INSERT INTO setor(setor, descricao, idLocal, createdAt, updatedAt) VALUES('B5', 'B5', 6, '2020-05-29', '2020-05-29');

INSERT INTO hierarquia(hierarquia, descricao, createdAt, updatedAt) VALUES('SD', 'Soldado Bombeiro Militar', '2020-05-29', '2020-05-29');
INSERT INTO hierarquia(hierarquia, descricao, createdAt, updatedAt) VALUES('CB', 'Cabo Bombeiro Militar', '2020-05-29', '2020-05-29');
INSERT INTO hierarquia(hierarquia, descricao, createdAt, updatedAt) VALUES('3º SGT', '3º SGT Bombeiro Militar', '2020-05-29', '2020-05-29');
INSERT INTO hierarquia(hierarquia, descricao, createdAt, updatedAt) VALUES('2º SGT', '2º SGT Bombeiro Militar', '2020-05-29', '2020-05-29');
INSERT INTO hierarquia(hierarquia, descricao, createdAt, updatedAt) VALUES('1º SGT', '1º SGT Bombeiro Militar', '2020-05-29', '2020-05-29');
INSERT INTO hierarquia(hierarquia, descricao, createdAt, updatedAt) VALUES('ST', 'Sub Ten Bombeiro Militar', '2020-05-29', '2020-05-29');
INSERT INTO hierarquia(hierarquia, descricao, createdAt, updatedAt) VALUES('2º TEN', '2º Tenente Bombeiro Militar', '2020-05-29', '2020-05-29');
INSERT INTO hierarquia(hierarquia, descricao, createdAt, updatedAt) VALUES('1º TEN', '1º Tenente Bombeiro Militar', '2020-05-29', '2020-05-29');
INSERT INTO hierarquia(hierarquia, descricao, createdAt, updatedAt) VALUES('CAP', 'Capitão Bombeiro Militar', '2020-05-29', '2020-05-29');
INSERT INTO hierarquia(hierarquia, descricao, createdAt, updatedAt) VALUES('MAJ', 'Major Bombeiro Militar', '2020-05-29', '2020-05-29');
INSERT INTO hierarquia(hierarquia, descricao, createdAt, updatedAt) VALUES('TEN CEL', 'Tenente Coronel Bombeiro Militar', '2020-05-29', '2020-05-29');
INSERT INTO hierarquia(hierarquia, descricao, createdAt, updatedAt) VALUES('CEL', 'Coronel Bombeiro Militar', '2020-05-29', '2020-05-29');

INSERT INTO escala(escala, createdAt, updatedAt) VALUES('ADMINISTRATIVO', '2020-05-29', '2020-05-29');

INSERT INTO pessoa(usuario, email,nome,matricula,dataNascimento,estadoCivil,dataIngresso,cartaoMunicipalSus, cartaoNacionalSus,sexo,tipoSanguineo,lts, foto,tipoPessoa,idHierarquia,idSetor,idBatalhao,idEscala, createdAt, updatedAt)
    VALUES('6b4aux', '6b4aux@cbm.sc.gov.br', '6b4aux', '123456-8','1997-05-05', 'SOLTEIRO', '2018-01-02', '123456', '9999 9999 9999 999', 'MASCULINO', 'O+', 1, '', 1,1,4,6,1, '2020-05-29', '2020-05-29');
