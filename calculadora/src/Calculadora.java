
import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class Calculadora extends JFrame implements ActionListener {
    
    // Componentes de la interfaz
    private JTextField pantalla;
    private JPanel panelBotones;
    private String[] etiquetas = {
        "7", "8", "9", "/",
        "4", "5", "6", "*",
        "1", "2", "3", "-",
        "C", "0", "=", "+"
    };

    // Variables para la lógica
    private double num1 = 0, num2 = 0, resultado = 0;
    private char operacion;

    public Calculadora() {
        // 1. Configuración de la ventana (JFrame)
        setTitle("Calculadora Java");
        setSize(300, 400);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new BorderLayout());

        // 2. Configuración de la pantalla (JTextField)
        pantalla = new JTextField("0");
        pantalla.setEditable(false); // El usuario no escribe, solo clickea
        pantalla.setHorizontalAlignment(JTextField.RIGHT);
        pantalla.setFont(new Font("Arial", Font.BOLD, 24));
        add(pantalla, BorderLayout.NORTH);

        // 3. Configuración de los botones (JPanel con GridLayout)
        panelBotones = new JPanel();
        panelBotones.setLayout(new GridLayout(4, 4, 5, 5)); // 4x4 con espacios de 5px

        for (String texto : etiquetas) {
            JButton boton = new JButton(texto);
            boton.setFont(new Font("Arial", Font.PLAIN, 18));
            boton.addActionListener(this); // Registramos el evento de click
            panelBotones.add(boton);
        }

        add(panelBotones, BorderLayout.CENTER);
        
        setVisible(true);
    }

    // 4. Lógica de los eventos (ActionListener)
    @Override
    public void actionPerformed(ActionEvent e) {
        String comando = e.getActionCommand();

        // Si es un número
        if (Character.isDigit(comando.charAt(0))) {
            if (pantalla.getText().equals("0")) {
                pantalla.setText(comando);
            } else {
                pantalla.setText(pantalla.getText() + comando);
            }
        } 
        // Si es el botón de limpiar
        else if (comando.equals("C")) {
            pantalla.setText("0");
            num1 = num2 = 0;
        } 
        // Si es el botón igual
        else if (comando.equals("=")) {
            num2 = Double.parseDouble(pantalla.getText());
            calcular();
            pantalla.setText(String.valueOf(resultado));
        } 
        // Si es una operación (+, -, *, /)
        else {
            num1 = Double.parseDouble(pantalla.getText());
            operacion = comando.charAt(0);
            pantalla.setText("0");
        }
    }

    private void calcular() {
        switch (operacion) {
            case '+': resultado = num1 + num2; break;
            case '-': resultado = num1 - num2; break;
            case '*': resultado = num1 * num2; break;
            case '/': 
                if (num2 != 0) resultado = num1 / num2;
                else pantalla.setText("Error");
                break;
        }
    }

    public static void main(String[] args) {
        // Ejecutamos en el hilo de despacho de eventos para evitar problemas visuales
        SwingUtilities.invokeLater(() -> new Calculadora());
    }
}