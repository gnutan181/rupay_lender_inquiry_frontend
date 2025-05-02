# import vertexai
# from vertexai.preview.generative_models import GenerativeModel, Image
# from vertexai.preview.vision_models import ImageGenerationModel

# def generate_bouquet_image(prompt: str):
#     vertexai.init(project="qwiklabs-gcp-00-08537b62b67c", location="europe-west4")

#     model = ImageGenerationModel.from_pretrained("imagen-3.0-generate-002")

#     images = model.generate_images(
#         prompt=prompt,
#         number_of_images=1,
#         seed=42,  # Use a fixed seed for consistent output
#         add_watermark=False,
#         generation_config={
#             "temperature": 0.2,          # Lower randomness
#             "topK": 10,                  # Limit to most probable choices
#             "topP": 0.8,                 # Include most meaningful words
#             "maxOutputTokens": 1024,     # Not always used in vision, but added for structure
#             "candidateCount": 1,
#             "presencePenalty": 0.0,
#             "frequencyPenalty": 0.0,
#             "seed": 42                   # Helps with reproducibility
#         }
#     ) 

#     with open("image.jpeg", "wb") as f:
#         f.write(images[0]._image_bytes)

#     print("✅ Image saved as 'image.jpeg'.")

# # Call the function
# generate_bouquet_image("Create an image containing exactly a bouquet of 2 sunflowers and 3 roses")

# def analyze_bouquet_image(image_path: str):
#     try:
#         # Initialize Vertex AI
#         vertexai.init(project="qwiklabs-gcp-03-409fa6abb8a1", location="us-central1")

#         # Load the Gemini model
#         model = GenerativeModel("gemini-2.0-flash-001")

#         # Load image using Gemini-compatible Image class
#         image = Image.load_from_file(image_path)
#         print("✅ Image successfully loaded.")

#         # Prompt to analyze the image
#         prompt = "Generate birthday wishes based on the image passed."
#         print("🧠 Generating birthday wishes based on the image.")

#         # Prepare multimodal input and generate response
#         contents = [image, prompt]
#         responses = model.generate_content(contents, stream=True)

#         # Collect and display responses
#         complete_message = ""
#         for response in responses:
#             if response.text:
#                 complete_message += response.text
#                 print(response.text, end="")

#         # Print final full message
#         print("\n\n✅ Full birthday wishes generated.")
#         print(complete_message)

#     except Exception as e:
#         print("❌ Failed to load image or generate response.")
#         print("Error:", str(e))
