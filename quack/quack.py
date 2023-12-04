import reflex as rx
import requests


class State(rx.State):
    image_url = ""
    processing = False
    complete = False

    def get_duck(self):
        base_url = "https://random-d.uk/api/v2"
        url = f"{base_url}/random"
        response = requests.get(url)
        self.processing, self.complete = True, False
        data = response.json()
        self.image_url = data.get("url")
        self.processing, self.complete = False, True
    
       

def index() -> rx.Component:
    return rx.center(
        rx.vstack(
            rx.heading("Get A Duck:)"),
            rx.button(
                "QUACK",
                on_click=State.get_duck,
                is_loading = State.processing,
                color_scheme = "yellow",
                width="100%",
            ),
            rx.cond(
                State.complete,
                    rx.image(
                        src=State.image_url,
                        height="25em",
                        width="25em",
                    )
            ), 
            
            padding="2em",
            shadow="lg",
            border_radius="lg",
    
        ),
        width="100%",
        height="100vh",
    )

app = rx.App()
app.add_page(index)
app.compile()