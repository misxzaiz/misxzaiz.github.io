package org.example;

import org.junit.jupiter.api.Test;

public class DemoTest {
    @Test
    public void test(){
        String s = "data:application/octet-stream;base64,";
        System.out.println(s.substring(5,29));
    }
}
