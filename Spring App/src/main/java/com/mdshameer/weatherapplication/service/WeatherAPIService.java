package com.mdshameer.weatherapplication.service;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

@Service
public class WeatherAPIService {

    @Autowired
    private RestTemplate restTemplate;
    private final String apiKey = "b98a3e8307758df293c077bb2498e73c";

    public ResponseEntity<?> makeApiCall(String cityName) throws IOException {
        String url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
        ResponseEntity<JsonNode> response = restTemplate.getForEntity(url, JsonNode.class);
        if (response.getStatusCode().is2xxSuccessful()) {
            return ResponseEntity.ok(response.getBody());
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to fetch weather data for the city.");
        }

    }
}
