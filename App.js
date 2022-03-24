import React, {useState, useEffect, useCallback} from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    StatusBar,
    LogBox,
    Button,
    TouchableHighlight,
} from 'react-native';

import colors from './src/utils/colors';
import Form from './src/components/Form';
import Footer from './src/components/Footer';
import ResultCalculation from './src/components/ResultCalculation';

// Ignore log notification by message
LogBox.ignoreLogs(['Remote debugger is in a background tab']);

export default function App() {
    const [capital, setCapital] = useState(null);
    const [interest, setInterest] = useState(null);
    const [months, setMoths] = useState(null);
    const [total, setTotal] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (capital && interest && months) {
            handleCalculate();
        } else {
            handleReset();
        }
    }, [capital, handleCalculate, interest, months]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleCalculate = useCallback(() => {
        handleReset();
        if (!capital) {
            setErrorMessage('Añade la cantidad que quieres solicitudar');
        } else if (!interest) {
            setErrorMessage('Añade el interes del prestamo');
        } else if (!months) {
            setErrorMessage('Selecciona los meses');
        } else {
            const i = interest / 100;
            const fee = capital / ((1 - Math.pow(i + 1, -months)) / i);
            setTotal({
                monthlyFee: fee.toFixed(2).replace('.', ','),
                totalPayable: (fee * months).toFixed(2).replace('.', ','),
            });
        }
    });

    const handleReset = () => {
        setErrorMessage('');
        setTotal(null);
    };

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={styles.safeArea}>
                <Text style={styles.titleApp}>Cotizador de Prestamos</Text>
                <Form
                    setCapital={setCapital}
                    setInterest={setInterest}
                    setMoths={setMoths}
                />
            </SafeAreaView>

            <ResultCalculation
                capital={capital}
                interest={interest}
                months={months}
                total={total}
                errorMessage={errorMessage}
            />

            <Footer handleCalculate={handleCalculate} />
        </>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: colors.PRIMARY_COLOR,
        height: 200,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: 'center',
    },
    titleApp: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 15,
    },
    btn: {
        position: 'absolute',
        bottom: 0,
    },
});
