# ---- Build ----
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY Portfolio.Api.csproj ./
RUN dotnet restore
COPY . ./
RUN dotnet publish -c Release -o /app /p:UseAppHost=false

# ---- Runtime ----
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /app ./

# Render provides $PORT; bind Kestrel to it.
ENV ASPNETCORE_ENVIRONMENT=Production
ENV ASPNETCORE_URLS=http://0.0.0.0:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "Portfolio.Api.dll"]
