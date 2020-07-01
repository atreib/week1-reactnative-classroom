import React, { useEffect, useState } from 'react';
import { 
    SafeAreaView,
    View,
    Text,
    StatusBar,
    FlatList,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import api from './services/api'

export default function App() {
    const [repositories, setRepositories] = useState([]);
    const [loadingRepos, setLoadingRepos] = useState(true);
    const [isInsertingRepo, setIsInsertingRepo] = useState(false);

    const getRepositories = async () => {
        try {
            return await api.get('repositories');
        } catch (err) {
            console.log("erro ao buscar repositorios: ", err);
            throw new Error(err);
        }
    };

    useEffect(async () => {
        setLoadingRepos(true);

        const { data: repos }  = await getRepositories();

        setTimeout(() => {
            setRepositories(repos);
            setLoadingRepos(false);
        }, 2000);
    }, []);

    const handleAddRepo = async () => {
        setIsInsertingRepo(true);

        const data = {
            title: `Repo ${Date.now()}`,
            url: `http://www.github.com/atreib/${Date.now()}`,
            techs: "Js NodeJs ReactNative ReactJs"
        };
        const { data: newRepo } = await api.post('repositories', data);

        setTimeout(() => {
            setRepositories([newRepo, ...repositories]);
            setIsInsertingRepo(false);
        }, 2000);
    };

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Git do André</Text>

                { 
                    !loadingRepos
                    && repositories 
                    && repositories.length > 0 
                    && <View style={styles.listaContainer}>
                        <FlatList
                            style={styles.lista}
                            data={repositories}
                            keyExtractor={repo => repo.id}
                            renderItem={({ item: repo }) => (
                                <Text style={styles.repository}>
                                    {repo.title}
                                </Text>
                            )}
                        /> 
                    </View> 
                }

                { 
                    !loadingRepos
                    && !repositories 
                    && repositories.length <= 0 
                    && <View style={styles.listaContainer}>
                        <Text style={styles.listaMsg}>
                            Nenhum repositório no ar
                        </Text>
                    </View> 
                }

                { 
                    loadingRepos
                    && <View style={styles.listaContainer}>
                        <Text style={styles.listaMsg}>
                            Atualizando repositórios...
                        </Text>
                    </View> 
                }

                {
                    !isInsertingRepo && 
                    <TouchableOpacity 
                        activeOpacity={0.6}
                        style={styles.button}
                        onPress={handleAddRepo}
                    >
                        <Text style={styles.buttonText}>Adicionar repositório</Text>
                    </TouchableOpacity>
                }

                {
                    isInsertingRepo && 
                    <TouchableOpacity style={styles.buttonDisabled}>
                        <Text style={styles.buttonText}>Inserindo repositório...</Text>
                    </TouchableOpacity>
                }
                
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        justifyContent: "center",
        alignItems: "center",
        padding: 32,
        fontSize: 14,
    },
    title: {
        fontSize: 31,
        margin: 8,
        fontWeight: 'bold',
        color: '#0D8AE6'
    },
    listaContainer: {
        maxHeight: 300,
        width: '100%'
    },
    listaMsg: {
        width: '100%',
        textAlign: 'center'
    },
    lista: {
        padding: 16,
        paddingTop: 0,
        paddingBottom: 0
    },
    repository: {
        width: "100%",
        marginTop: 4,
        marginBottom: 4,
        padding: 16,
        fontSize: 21,
        borderRadius: 4,
        backgroundColor: "#0d0d0d",
        color: '#ffffff'
    },
    button: {
        alignSelf: "stretch",
        margin: 16,
        backgroundColor: '#0D8AE6',
        padding: 16,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonDisabled: {
        alignSelf: "stretch",
        margin: 16,
        backgroundColor: '#ccc',
        padding: 16,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff'
    }
});